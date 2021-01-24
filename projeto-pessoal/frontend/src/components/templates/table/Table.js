import React from 'react';

import {Table, Button, Card} from 'react-bootstrap';
import { Check, TrashFill, Exclamation } from 'react-bootstrap-icons';

export default props => (

    <Table striped hover>
        {props.tasks.length > 0 ? 
            <>
                <thead>
                    <tr>
                        <th>Status</th>
                        <th>Tarefa</th>
                        <th>Ordem</th>
                        {!props.completed || props.completed == 'trueAndFalse' ? <th>Ação</th> : null}
                    </tr>
                </thead>
                <tbody>
                    {props.tasks.map(task=>(
                        <tr>
                        <td>{task.completed ? <Button variant='success'><Check size='20'/></Button> : <Button variant='warning'><Exclamation size='20'/></Button>}</td>
                        {props.completed === true? <td style={{textDecoration: "line-through"}}>{task.title}</td> : <td>{task.title}</td>}
                        <td>{task.order}</td>
                        {!task.completed ? <td><Button variant="danger" onClick={()=>props.deleteTask(task.url)}><TrashFill/></Button></td> : <Button variant="secondary"><TrashFill/></Button>}
                        </tr>
                    ))}
                </tbody>
            </>
        : 
            <Card>
            <Card.Body>
                <Card.Title id='Sobre'>Lista vazia</Card.Title>
                <Card.Text>
                    Ops! Não existem tarefas {props.completed === true ? 'concluídas' : !props.completed ? 'em andamento' : ''} cadastradas :(
                </Card.Text>
            </Card.Body>
            </Card>
        }
    </Table>
    
)