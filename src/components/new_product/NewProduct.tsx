import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import './NewProduct.scss'

function NewProduct() {


    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        author: Yup.string().required('Author is required'),
        year: Yup.string().required('Year of publication is required'),
        rating: Yup.string()
            .min(0, 'Rating must be greater than or equal to 0')
            .max(5, 'Rating must be less than or equal to 5')
            .required('Rating is required'),
    });

    return (
        <div className="newProductPage">
            <Formik
                initialValues={{ name: '', author: '', year: '', rating: '' }}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                    console.log(values);
                }}>

                {({ errors, touched, dirty }) => (
                    <Form>
                        <label htmlFor="name"> Name </label>
                        <Field id="name" name="name" type="text" />
                        {errors.name && touched.name && !dirty ? (
                            <div className="error">{errors.name}</div>
                        ) : null}

                        <label htmlFor="author"> Author </label>
                        <Field id="author" name="author" type="text" />
                        {errors.author && touched.author && !dirty ? (
                            <div className="error">{errors.author}</div>
                        ) : null}

                        <label htmlFor="year"> Year of publication </label>
                        <Field id="year" name="year" type="number" />
                        {errors.year && touched.year && !dirty ? (
                            <div className="error">{errors.year}</div>
                        ) : null}

                        <label htmlFor="rating"> Rating </label>
                        <Field id="rating" name="rating" type="number" />
                        {errors.rating && touched.rating && !dirty ? (
                            <div className="error">{errors.rating}</div>
                        ) : null}
                        <button> Create </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default NewProduct;
