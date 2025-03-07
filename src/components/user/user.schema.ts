const createUserSchema = {
    $id: 'createUserSchema',
    type: 'object',
    properties: {
      email: { type: 'string' },
      password: { type: 'string' },
      first_name: { type: 'string' },
      last_name: { type: 'string' },
      date_of_birth: { type: 'string', format: 'date-time' }
    },
    required: ['email', 'password', 'first_name']
  };
  
  const createUserResponseSchema = {
    $id: 'createUserResponseSchema',
    type: 'object',
    properties: {
      id: { type: 'number' },
      email: { type: 'string' },
      first_name: { type: 'string' },
      last_name: { type: 'string' },
      date_of_birth: { type: 'string', format: 'date-time' }
    }
  };
  
  const userLoginSchema = {
    $id: 'userLoginSchema',
    type: 'object',
    properties: {
      email: { type: 'string' },
      password: { type: 'string' }
    },
    required: ['email', 'password']
  };
  
  const userLoginResponseSchema = {
    $id: 'userLoginResponseSchema',
    type: 'object',
    properties: {
      accessToken: { type: 'string' }
    }
  };
  
  const updateUserSchema = {
    $id: 'updateUserSchema',
    type: 'object',
    properties: {
      email: { type: 'string' },
      password: { type: 'string' },
      first_name: { type: 'string' },
      last_name: { type: 'string' },
      date_of_birth: { type: 'string', format: 'date-time' }
    }
  };
  
  export {
    createUserSchema,
    createUserResponseSchema,
    userLoginSchema,
    userLoginResponseSchema,
    updateUserSchema
  };