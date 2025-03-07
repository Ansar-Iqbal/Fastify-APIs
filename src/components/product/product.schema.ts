const createProductSchema = {
    $id: 'createProductSchema',
    type: 'object',
    properties: {
      title: { type: 'string' },
      content: { type: 'string' },
      price: { type: 'number' },
      categoryType: { type: 'string', enum: ['HOME', 'ELECTRONICS', 'MENS_COLLECTION', 'WOMENS_COLLECTION', 'HEALTH_BEAUTY'] }
    },
    required: ['title', 'price', 'categoryType']
  };
  
  const createProductResponseSchema = {
    $id: 'createProductResponseSchema',
    type: 'object',
    properties: {
      id: { type: 'number' },
      title: { type: 'string' },
      content: { type: 'string' },
      price: { type: 'number' },
      owner_id: { type: 'number' },
      categoryType: { type: 'string' },
      created_at: { type: 'string', format: 'date-time' },
      updated_at: { type: 'string', format: 'date-time' }
    }
  };
  
  const updateProductSchema = {
    $id: 'updateProductSchema',
    type: 'object',
    properties: {
      title: { type: 'string' },
      content: { type: 'string' },
      price: { type: 'number' },
      categoryType: { type: 'string', enum: ['HOME', 'ELECTRONICS', 'MENS_COLLECTION', 'WOMENS_COLLECTION', 'HEALTH_BEAUTY'] }
    }
  };
  
  export {
    createProductSchema,
    createProductResponseSchema,
    updateProductSchema
  };