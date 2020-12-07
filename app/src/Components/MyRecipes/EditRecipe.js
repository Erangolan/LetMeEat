import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    container: {
      marginTop: '120px',
      textAlign: 'center', 
    },
}));

const Input = ({ type, name, onChange, value, ...rest }) => (
    <input
        name={name}
        type={type}
        value={value}
        onChange={event => {
            event.preventDefault();
            onChange(name, event.target.value);
        }}
        {...rest}
    />
);


export default function EditRecipe() {
    const classes = useStyles();
    const { handleSubmit } = useForm();
    const [values, setValues] = useState({});

    const onChange = (name, value) => {
        setValues({ ...values, [name]: value });
    };

    const onSubmit = () => {
        async function fetchData(){
            try {
                await fetch(`http://localhost:3000/recipes/edit?id=${values.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify ({
                        "id": values.id, 
                        "title": values.title, 
                        "img": values.img, 
                        "ingredients": values.ingredients, 
                        "instructions": values.instructions 
                    }),
                })
                .then(res => console.log(res.json()))
            } catch(err){
                console.log(`fetch: ${err}`);
            } finally {
                return <div></div>
            }
        }
        fetchData();
    };


    return (
        <div className={classes.container}>
            <div className="col-sm-12">
                <h3>Edit recipe</h3>
            </div>
            <div className="col-sm-12">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                        <Input
                            className="form-control"
                            name="id"
                            placeholder="id"
                            type="id"
                            value={values.id}
                            onChange={onChange}
                        />
                    </div>
                    <div className="form-group">
                        <Input
                            className="form-control"
                            type="title"
                            placeholder="recipe's title"
                            name="title"
                            value={values.title}
                            onChange={onChange}
                        />
                    </div>
                    <div className="form-group">
                        <Input
                            className="form-control"
                            type="img"
                            placeholder="recipe's img"
                            name="img"
                            value={values.img}
                            onChange={onChange}
                        />
                    </div>
                    <div className="form-group">
                        <Input
                            className="form-control"
                            type="ingredients"
                            placeholder="recipe's ingredients"
                            name="ingredients"
                            value={values.ingredients}
                            onChange={onChange}
                        />
                    </div>
                    <div className="form-group">
                        <Input
                            className="form-control"
                            type="instructions"
                            placeholder="recipe's instructions"
                            name="instructions"
                            value={values.instructions}
                            onChange={onChange}
                        />
                    </div>
                    <div className="form-group">
                        <input className="btn btn-primary" type="submit" />
                    </div>
                </form>
            </div>
        </div>
    );
}