import React, {Component} from 'react';
import axios from 'axios';
import Main from '../templates/Main';

const headerProps = {
    icon: 'users',
    title: 'Usuários',
    subtitle: 'Cadastro de usuários: Incluir, Listar, Alterar e Excluir.'
}

const baseUrl = 'http://localhost:3001/users';

const initialState = {
    user: {name: '', email:''},
    list: []
}

export default class UserCrud extends Component {

    state = {...initialState};

    async componentWillMount(){
        const list = await axios(baseUrl);
        this.setState({list:list.data});
    }

    clear(){
        this.setState({user: initialState.user});
    }

    async save(id){
        const user = this.state.user;
        const method = user.id ? 'put' : 'post';
        const url = user.id ? `${baseUrl}/${user.id}` : baseUrl;
        const res = await axios[method](url, user);
        const list = this.getUpdatedList(res.data);
        this.setState({user: initialState.user, list})
    }

    getUpdatedList(user){
        const list = this.state.list.filter(u => u.id!=user.id);
        list.unshift(user);
        return list;
    }

    updateField(event){
        const user = {...this.state.user};
        user[event.target.name] = event.target.value;
        this.setState({user});
    }

    renderForm(){
        return (
            <div className='form'>
                <div className='row'>
                    <div className='col-12 col-md-6'>
                        <div className='form-group'>
                            <label>Nome</label>
                            <input type='text' className='form-control'
                                name='name'
                                value={this.state.user.name}
                                onChange={e=>this.updateField(e)}
                                placeholder='Digite o nome...'
                            />
                        </div>
                    </div>

                    <div className='col-12 col-md-6'>
                        <div className='form-group'>
                            <label>E-mail</label>
                            <input type='text' className='form-control'
                                name='email'
                                value={this.state.user.email}
                                onChange={e => this.updateField(e)}
                                placeholder='Digite o e-mail...'
                                />
                        </div>
                    </div>
                </div>

                <hr/>
                <div className='row'>
                    <div className='col-12 d-flex justify-content-end'>
                        <button className='btn btn-primary' onClick={e => this.save(e)}>
                            Salvar
                        </button>
                        <button className='btn btn-secondary ml-2' onClick={e => this.clear(e)}>
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    load(user){
        this.setState({user});
    }

    remove(user){
        axios.delete(`${baseUrl}/${user.id}`).then(res=>{
            const list = this.state.list.filter(id => id !== user.id);
            this.setState({list});
        })
    }

    renderTable(){
        return (
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>E-mail</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </table>
        )
    }

    renderRows(){
        return this.state.list.map(user=>{
            return (
                <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                        <button className='btn btn-warning' onClick={()=>this.load(user)}>
                            <i className='fa fa-pencil'/>
                        </button>
                        <button className='btn btn-danger ml-2' onClick={()=>this.remove(user)}>
                            <i className='fa fa-trash'/>
                        </button>
                    </td>
                </tr>
            )
        })
    }

    render(){
        return (
            <Main {...headerProps}>
                {this.renderForm()}
                {this.renderTable()}
            </Main>
        )
    }
}