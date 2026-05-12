#!/bin/bash

# Script to create a new feature with standard structure
# Usage: ./scripts/create-feature.sh feature-name

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if feature name is provided
if [ -z "$1" ]; then
    echo -e "${RED}Error: Feature name is required${NC}"
    echo "Usage: ./scripts/create-feature.sh feature-name"
    exit 1
fi

FEATURE_NAME=$1
FEATURE_DIR="src/features/${FEATURE_NAME}"

# Check if feature already exists
if [ -d "$FEATURE_DIR" ]; then
    echo -e "${RED}Error: Feature '${FEATURE_NAME}' already exists${NC}"
    exit 1
fi

echo -e "${YELLOW}Creating feature: ${FEATURE_NAME}${NC}"

# Create directory structure
mkdir -p "${FEATURE_DIR}"/{api,components,hooks,types,utils}

# Create API files
cat > "${FEATURE_DIR}/api/${FEATURE_NAME}.api.ts" << 'EOF'
/**
 * FEATURE_NAME API
 * All FEATURE_NAME-related API calls
 */

import { apiClient } from '@/core/api';
import { PaginatedResponse, PaginationParams } from '@/core/api/types';
import type { FEATURE_NAME_PASCAL } from '../types';

const BASE_URL = '/FEATURE_NAME_PLURAL';

export const FEATURE_NAME_CAMELApi = {
  /**
   * Get paginated list
   */
  getAll: async (pagination?: PaginationParams): Promise<PaginatedResponse<FEATURE_NAME_PASCAL>> => {
    const response = await apiClient.get<PaginatedResponse<FEATURE_NAME_PASCAL>>(BASE_URL, {
      params: pagination,
    });
    return response.data;
  },

  /**
   * Get single item by ID
   */
  getById: async (id: string): Promise<FEATURE_NAME_PASCAL> => {
    const response = await apiClient.get<FEATURE_NAME_PASCAL>(`${BASE_URL}/${id}`);
    return response.data;
  },

  /**
   * Create new item
   */
  create: async (data: Partial<FEATURE_NAME_PASCAL>): Promise<FEATURE_NAME_PASCAL> => {
    const response = await apiClient.post<FEATURE_NAME_PASCAL>(BASE_URL, data);
    return response.data;
  },

  /**
   * Update existing item
   */
  update: async (id: string, data: Partial<FEATURE_NAME_PASCAL>): Promise<FEATURE_NAME_PASCAL> => {
    const response = await apiClient.patch<FEATURE_NAME_PASCAL>(`${BASE_URL}/${id}`, data);
    return response.data;
  },

  /**
   * Delete item
   */
  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`${BASE_URL}/${id}`);
  },
};
EOF

cat > "${FEATURE_DIR}/api/index.ts" << EOF
/**
 * ${FEATURE_NAME} API barrel export
 */

export * from './${FEATURE_NAME}.api';
EOF

# Create types file
cat > "${FEATURE_DIR}/types/index.ts" << EOF
/**
 * ${FEATURE_NAME} feature types
 */

import { BaseEntity } from '@/shared/types';

export interface FEATURE_NAME_PASCAL extends BaseEntity {
  name: string;
  // Add your fields here
}

export interface FEATURE_NAME_PASCALFilters {
  search?: string;
  sortBy?: string;
  sortDirection?: 'asc' | 'desc';
}
EOF

# Create hooks file
cat > "${FEATURE_DIR}/hooks/use-${FEATURE_NAME}.ts" << 'EOF'
/**
 * FEATURE_NAME data hooks
 * React Query hooks for FEATURE_NAME operations
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { PaginationParams } from '@/core/api/types';
import { FEATURE_NAME_CAMELApi } from '../api';
import type { FEATURE_NAME_PASCAL } from '../types';

const QUERY_KEY = ['FEATURE_NAME_PLURAL'];

/**
 * Get paginated list
 */
export function useFEATURE_NAME_PLURAL(pagination?: PaginationParams) {
  return useQuery({
    queryKey: [...QUERY_KEY, 'list', pagination],
    queryFn: () => FEATURE_NAME_CAMELApi.getAll(pagination),
  });
}

/**
 * Get single item by ID
 */
export function useFEATURE_NAME_PASCAL(id: string) {
  return useQuery({
    queryKey: [...QUERY_KEY, 'detail', id],
    queryFn: () => FEATURE_NAME_CAMELApi.getById(id),
    enabled: !!id,
  });
}

/**
 * Create new item
 */
export function useCreateFEATURE_NAME_PASCAL() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<FEATURE_NAME_PASCAL>) => FEATURE_NAME_CAMELApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    },
  });
}

/**
 * Update existing item
 */
export function useUpdateFEATURE_NAME_PASCAL() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<FEATURE_NAME_PASCAL> }) =>
      FEATURE_NAME_CAMELApi.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: [...QUERY_KEY, 'detail', variables.id] });
    },
  });
}

/**
 * Delete item
 */
export function useDeleteFEATURE_NAME_PASCAL() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => FEATURE_NAME_CAMELApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    },
  });
}
EOF

cat > "${FEATURE_DIR}/hooks/index.ts" << EOF
/**
 * ${FEATURE_NAME} hooks barrel export
 */

export * from './use-${FEATURE_NAME}';
EOF

# Create utils file
cat > "${FEATURE_DIR}/utils/index.ts" << EOF
/**
 * ${FEATURE_NAME} utils barrel export
 */

// Add your utility functions here
EOF

# Create components index
cat > "${FEATURE_DIR}/components/index.ts" << EOF
/**
 * ${FEATURE_NAME} components barrel export
 */

// Export your components here
// export { FEATURE_NAME_PASCALList } from './FEATURE_NAME_PASCALList';
// export { FEATURE_NAME_PASCALDetail } from './FEATURE_NAME_PASCALDetail';
EOF

# Create main index file
cat > "${FEATURE_DIR}/index.ts" << EOF
/**
 * ${FEATURE_NAME} feature barrel export
 * Public API for the ${FEATURE_NAME} feature
 */

// Types
export * from './types';

// API
export * from './api';

// Hooks
export * from './hooks';

// Utils
export * from './utils';

// Components are exported from their specific locations
// Import components directly from '@/features/${FEATURE_NAME}/components/...'
EOF

echo -e "${GREEN}✓ Feature structure created successfully!${NC}"
echo ""
echo -e "${YELLOW}Next steps:${NC}"
echo "1. Update types in ${FEATURE_DIR}/types/index.ts"
echo "2. Implement API calls in ${FEATURE_DIR}/api/${FEATURE_NAME}.api.ts"
echo "3. Create components in ${FEATURE_DIR}/components/"
echo "4. Add utility functions in ${FEATURE_DIR}/utils/"
echo ""
echo -e "${GREEN}Feature location: ${FEATURE_DIR}${NC}"
