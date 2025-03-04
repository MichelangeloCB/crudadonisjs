/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'



Route.post('/api/users/login', async ({ auth, request, response }) => {
    const email = request.input('email')
    const password = request.input('password')
  
    try {
        const token = await auth.use('api').attempt(email, password)
        return token
      } catch {
        return response.unauthorized('Invalid credentials')
      }
  })

Route.post('/api/users/create', 'UsersController.store')
Route.get('/api/users/list', 'UsersController.index')
Route.put('/api/users/:user', 'UsersController.update')
Route.delete('/api/users/:user', 'UsersController.destroy')
