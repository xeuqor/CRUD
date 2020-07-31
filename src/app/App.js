import React, { Component } from 'react';

class App extends Component {
    constructor() {
        super();
        this.state = {
            nombre: '',
            descripcion: '',
            precio: '',
            codigo: '',
            tasks: [],
            _id: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.addTask = this.addTask.bind(this);
    }

    //GUARDAR Y EDITAR PRODUCTOS
    addTask(e) {
        if (this.state._id) {
            fetch(`/api/task/${this.state._id}`, {
                method: 'PUT',
                body: JSON.stringify(this.state),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    M.toast({ html: 'PRODUCTO ACTUALIZADO' });
                    this.setState({ nombre: '', descripcion: '', precio: '', codigo: '', _id: '' })
                    this.fetchTasks();
                });

        } else {
            fetch('/api/task', {
                method: 'POST',
                body: JSON.stringify(this.state),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    M.toast({ html: 'PRODUCTO COMPRADO' });
                    this.setState({ nombre: '', descripcion: '', precio: '', codigo: '' })
                    this.fetchTasks();
                })
                .catch(err => console.error(err));
        }

        e.preventDefault();
    }

    //SE EJECUTA CUANDO CARGA LA PAGINA
    componentDidMount() {
        this.fetchTasks();
    }


    //OBTIENE LOS DATOS
    fetchTasks() {
        fetch('/api/task')
            .then(res => res.json())
            .then(data => {
                this.setState({ tasks: data });
                console.log(this.state.tasks);
            });
    }

    deleteTask(id) {
        if (confirm('Estas seguro de querer eliminarlo?')) {
            fetch('/api/task/' + id, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    M.toast({ html: 'PRODUCTO ELIMINADO' });
                    this.fetchTasks();
                })
        }
    }

    editTask(id) {
        fetch(`/api/task/${id}`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                this.setState({
                    nombre: data.nombre,
                    descripcion: data.descripcion,
                    precio: data.precio,
                    codigo: data.codigo,
                    _id: data._id
                })
            });

    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        })
    }
    render() {
        return (
            <div>
                {/*NAVEGACION*/}
                <nav className="yellow darken-3">
                    <div className="container">
                        <a className="brand-logo center" href="/">MINI TIENDA</a>
                    </div>
                </nav>

                <div className="container">
                    <div className="row">
                        <div className="col s5">
                            <div className="card">
                                <div className="card-content">
                                    <form onSubmit={this.addTask}>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input name="nombre" onChange={this.handleChange} type="text" placeholder="Nombre" value={this.state.nombre}></input>

                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input name="descripcion" onChange={this.handleChange} type="text" placeholder="Descripcion" value={this.state.descripcion} ></input>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input name="precio" onChange={this.handleChange} type="number" placeholder="Precio" value={this.state.precio} ></input>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input name="codigo" onChange={this.handleChange} type="number" placeholder="Codigo" value={this.state.codigo} ></input>
                                            </div>
                                        </div>
                                        <button type="submit" className="btn light-blue darken-4" >
                                            Comprar
                                        </button>
                                    </form>
                                </div>
                            </div>

                        </div>
                        <div className="col s7">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Nombre</th>
                                        <th>Descripcion</th>
                                        <th>Precio</th>
                                        <th>Codigo</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.tasks.map(task => {
                                            return (
                                                <tr key={task._id}>
                                                    <td>{task.nombre}</td>
                                                    <td>{task.descripcion}</td>
                                                    <td>{task.precio}</td>
                                                    <td>{task.codigo}</td>
                                                    <td>
                                                        <button className="btn light-blue darken-4" onClick={() => this.deleteTask(task._id)}>
                                                            <i className="material-icons">delete</i>
                                                        </button>
                                                        <button className="btn light-blue darken-4" onClick={() => this.editTask(task._id)} style={{ margin: '4px' }}>
                                                            <i className="material-icons">edit</i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default App;