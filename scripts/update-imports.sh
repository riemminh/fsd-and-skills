#!/bin/bash

# Script to update imports from old structure to new structure
# Usage: ./scripts/update-imports.sh

set -e

echo "🔄 Updating imports to new structure..."

# Update imports in features/orders/components
find src/features/orders/components -name "*.tsx" -type f -exec sed -i '' \
  -e 's|@/types/order|@/features/orders|g' \
  -e 's|@/types/product|@/features/products|g' \
  -e 's|@/types/user|@/features/auth|g' \
  -e 's|@/hooks/use-orders|@/features/orders|g' \
  -e 's|@/hooks/use-products|@/features/products|g' \
  -e 's|@/services/order.service|@/features/orders|g' \
  -e 's|@/services/product.service|@/features/products|g' \
  -e 's|@/services/auth.service|@/features/auth|g' \
  -e 's|@/contexts/auth-context|@/features/auth|g' \
  -e 's|@/lib/utils|@/shared/utils|g' \
  -e 's|@/components/ui/|@/shared/components/ui/|g' \
  {} \;

# Update imports in app pages
find src/app -name "*.tsx" -type f -exec sed -i '' \
  -e 's|@/types/order|@/features/orders|g' \
  -e 's|@/types/product|@/features/products|g' \
  -e 's|@/types/user|@/features/auth|g' \
  -e 's|@/hooks/use-orders|@/features/orders|g' \
  -e 's|@/hooks/use-products|@/features/products|g' \
  -e 's|@/services/order.service|@/features/orders|g' \
  -e 's|@/services/product.service|@/features/products|g' \
  -e 's|@/services/auth.service|@/features/auth|g' \
  -e 's|@/contexts/auth-context|@/features/auth|g' \
  -e 's|@/components/orders/|@/features/orders/components/|g' \
  -e 's|@/lib/utils|@/shared/utils|g' \
  {} \;

# Update imports in shared components
find src/components -name "*.tsx" -type f -exec sed -i '' \
  -e 's|@/lib/utils|@/shared/utils|g' \
  -e 's|@/contexts/auth-context|@/features/auth|g' \
  {} \;

echo "✅ Imports updated successfully!"
echo ""
echo "Next steps:"
echo "1. Run 'pnpm build' to check for TypeScript errors"
echo "2. Fix any remaining import issues manually"
echo "3. Test the application"
