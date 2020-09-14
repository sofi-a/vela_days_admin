import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
    Button,
    Card,
    Container,
    Form,
    FormFeedback,
    FormGroup,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Label,
    Spinner,
} from 'reactstrap';
import { ErrorMessage, Formik } from 'formik';
import * as yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faEnvelope,
    faKey,
    faUser,
    faUserCircle,
} from '@fortawesome/free-solid-svg-icons';
import AlertBox from '../alerts/AlertBox';
import { register } from '../../actions/auth';

const Register = ({ register }) => {
    const registrationValidationSchema = yup.object().shape({
        name: yup.string().required('Name is required'),
        email: yup.string().email().required('Email is required'),
        password: yup.string().required('Password is required'),
        confirmation: yup.string()
                         .oneOf([yup.ref('password'), null], 'Passwords must match')
                         .required('Password confirmation is required'),
    });

    return (
        <Container>
            <Card className="shadow-sm mx-auto my-4 py-4 px-5 col-sm-10 col-md-8 col-lg-4">
                <AlertBox />
                <div className="text-center">
                    <span className="text-primary">
                        <FontAwesomeIcon icon={faUserCircle} size="3x" />
                    </span>
                    <h4 className="text-primary mt-2">Sign Up</h4>
                </div>
                <div className="d-flex flex-column justify-content-center mt-3">
                    <Formik
                        initialValues={{
                            name: '',
                            email: '',
                            password: '',
                            confirmation: '',
                        }}
                        validationSchema={registrationValidationSchema}
                        onSubmit={async (values, { setSubmitting }) => {
                            const { name, email, password } = values;
                            await register(name, email, password);
                            setSubmitting(false);
                        }}>
                            {({
                                values,
                                errors,
                                touched,
                                handleChange,
                                handleBlur,
                                handleSubmit,
                                isSubmitting
                            }) => (
                                <Form onSubmit={handleSubmit} noValidate>
                                    <FormGroup className="mb-3">
                                        <InputGroup>
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <FontAwesomeIcon icon={faUser} />
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input
                                                value={values.name}
                                                name="name"
                                                placeholder="Full Name"
                                                autoFocus
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                invalid={errors.name && touched.name ? true : false}
                                                valid={!errors.name && touched.name ? true : false} />
                                            <FormFeedback className="ml-5 w-75">
                                                <ErrorMessage name="name">{msg => msg}</ErrorMessage>
                                            </FormFeedback>
                                        </InputGroup>
                                    </FormGroup>
                                    <FormGroup className="mb-3">
                                        <InputGroup>
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <FontAwesomeIcon icon={faEnvelope} />
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input
                                                type="email"
                                                value={values.email}
                                                name="email"
                                                placeholder="Email"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                invalid={errors.email && touched.email ? true : false}
                                                valid={!errors.email && touched.email ? true : false} />
                                            <FormFeedback className="ml-5 w-75">
                                                <ErrorMessage name="email">{msg => msg}</ErrorMessage>
                                            </FormFeedback>
                                        </InputGroup>
                                    </FormGroup>
                                    <FormGroup className="mb-3">
                                        <InputGroup>
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <FontAwesomeIcon icon={faKey} />
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input
                                                type="password"
                                                value={values.password}
                                                name="password"
                                                placeholder="Password"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                invalid={errors.password && touched.password ? true : false}
                                                valid={!errors.password && touched.password ? true : false} />
                                            <FormFeedback className="ml-5 w-75">
                                                <ErrorMessage name="password">{msg => msg}</ErrorMessage>
                                            </FormFeedback>
                                        </InputGroup>
                                    </FormGroup>
                                    <FormGroup className="mb-3">
                                        <InputGroup>
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <FontAwesomeIcon icon={faKey} />
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input
                                                type="password"
                                                value={values.confirmation}
                                                name="confirmation"
                                                placeholder="Confirm Password"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                invalid={errors.confirmation && touched.confirmation ? true : false}
                                                valid={!errors.confirmation && touched.confirmation ? true : false} />
                                            <FormFeedback className="ml-5 w-75">
                                                <ErrorMessage name="confirmation">{msg => msg}</ErrorMessage>
                                            </FormFeedback>
                                        </InputGroup>
                                    </FormGroup>
                                    <FormGroup className="mb-3">
                                        <Button outline color="primary" type="submit" disabled={isSubmitting} className="w-100">
                                            {isSubmitting ? <Spinner color="primary" size="sm" /> : 'Register'}
                                        </Button>
                                    </FormGroup>
                                </Form>
                            )}
                    </Formik>
                    <div>
                        <Link to="/home/register">
                            <p>Already have an account? Login</p>
                        </Link>
                    </div>
                </div>
            </Card>
        </Container>
    )
};

Register.propTypes = {
    register: PropTypes.func.isRequired,
};

export default connect(
    null,
    { register }
)(Register);
