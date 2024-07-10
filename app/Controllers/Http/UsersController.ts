import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UsersController {
  public async index({}: HttpContextContract) {

      return await User.all()
  }

  public async store({ request }: HttpContextContract) {

    const userData = request.only(['name', 'email', 'password',])
    const user = await User.create({
      
      name: userData.name,
      email: userData.email,
      password: userData.password
      
    })
    return user
  }
  public async update({ request, response }: HttpContextContract) {
    const userId = request.param('user');
    const user = await User.find(userId);
  
    if (!user) {
      return response.status(404).json({ message: 'Usuário não encontrado' });
    }
  
    user.merge({
      email: request.input('email'),
      name: request.input('name'),
      endereco: request.input('endereco'),
      telefone: request.input('telefone'),
    })
  
    try {
      await user.save();
      return response.status(200).json(user);
    } catch (error) {
      return response.status(400).json({ message: 'Erro ao atualizar usuário', error: error.message });
    }
  }
  public async destroy({ params, response }: HttpContextContract) {
    const userId = params.user;
    const user = await User.find(userId);

    if (!user) {
      return response.status(404).json({ message: 'Usuário não encontrado' });
    }

    try {
      await user.delete();
      return response.status(200).json({ message: 'Usuário excluído com sucesso' });
    } catch (error) {
      return response.status(500).json({ message: 'Erro ao excluir usuário', error: error.message });
    }
  }
}

