
# Design Choices Documentation

## State Management

### Main Table State
- **URL State**: Filters, sorting, and pagination are managed via URL query parameters
  - Benefits: Bookmarkable state, server-side rendering compatibility
- **React Context**: Used for shared state across components
- **Local State**: Individual row states (expanded, loading, editing) are managed with React hooks
  - Each row maintains its own state for expansion and editing
  - Loading states are handled per row when fetching orders

### Complex State Handling
- **Expanded Rows**: Managed with a record object tracking each row's state
- **Editing States**: Separate states for customer status and garment measurements
- **Optimistic Updates**: Local state updates before API confirmation for better UX

## API Design

### Endpoint Structure
- `GET /api/customers`: Returns paginated customer list
- `GET /api/customers/[id]/orders`: Returns orders for a specific customer

### Separation Rationale
1. **Performance**: Avoids loading unnecessary order data in the main customer list
2. **Scalability**: Allows independent scaling of customer and order endpoints
3. **Maintainability**: Clear separation of concerns
4. **Bandwidth Efficiency**: Reduces payload size for initial page load

## Technical Challenges

### Nested Inline Editing
**Challenge**: Managing state for deeply nested measurements (chest/waist/hips) while maintaining clean component structure

**Solution**:
1. Created a dedicated `SizeEditor` component
2. Used a composite state object for all measurements
3. Implemented proper TypeScript interfaces for type safety
4. Added optimistic updates for smooth UX
5. Created proper save/cancel flows

## Future Improvements

If I had another day, I would prioritize:

**Feature**: Implement server-side persistence for all edits

- Make the UI more appealing and user friendly

**Why**:
1. Currently only logs edits to console
2. Would complete the full CRUD functionality
3. Essential for production readiness
4. Would require:
   - Additional API endpoints
   - Proper error handling
   - Loading states during save operations
   - Data validation