import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
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
    faLock,
} from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import { login } from '../../actions/auth';
import AlertBox from '../alerts/AlertBox';

const Login = ({ login }) => {
    const loginValidationSchema = yup.object().shape({
        email: yup.string().email().required('Email is required'),
        password: yup.string().required('Password is required'),
    });

    return (
        <Container>
            <Card className="shadow-sm mx-auto my-4 py-4 px-5 col-xs-11 col-sm-9 col-md-7 col-lg-4">
                <AlertBox />
                <div className="text-center">
                    <span className="text-primary">
                        <FontAwesomeIcon icon={faLock} size="3x" />
                    </span>
                    <h4 className="text-primary mt-2">Login</h4>
                </div>
                <div className="d-flex flex-column justify-content-center mt-3">
                    <Formik
                        initialValues={{
                            email: '',
                            password: '',
                            remember: false,
                        }}
                        validationSchema={loginValidationSchema}
                        onSubmit={async (values, { setSubmitting }) => {
                            const { email, password, remember } = values;
                            await login(email, password);
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
                                                    <FontAwesomeIcon icon={faEnvelope} />
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input
                                                value={values.email}
                                                type="email"
                                                name="email"
                                                placeholder="Email"
                                                autoComplete="email"
                                                autoFocus
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                invalid={errors.email && touched.email ? true : false}
                                                valid={!errors.email && touched.email ? true : false} />
                                                <FormFeedback className="ml-5 w-75">
                                                    <ErrorMessage name="email">{msg => msg}</ErrorMessage>
                                                </FormFeedback>
                                        </InputGroup>
                                    </FormGroup>
                                    <FormGroup className="mb-3 w-100">
                                        <InputGroup>
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <FontAwesomeIcon icon={faKey} />
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input
                                                type="password"
                                                name="password"
                                                placeholder="Password"
                                                autoComplete="password"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                invalid={errors.password && touched.password ? true : false}
                                                valid={!errors.password && touched.password ? true : false} />
                                            <FormFeedback className="ml-5 w-75">
                                                <ErrorMessage name="password">{msg => msg}</ErrorMessage>
                                            </FormFeedback>
                                        </InputGroup>
                                    </FormGroup>
                                    <FormGroup className="mt-3 mb-4" check>
                                        <Label check>
                                            <Input
                                                value={values.remember}
                                                type="checkbox" />{' '}
                                            Remember Me
                                        </Label>
                                    </FormGroup>
                                    <FormGroup className="mb-3">
                                        <Button
                                            outline
                                            color="primary"
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-100">
                                            {isSubmitting ? <Spinner color="primary" size="sm" /> : 'Login'}
                                        </Button>
                                    </FormGroup>
                                </Form>
                            )}
                    </Formik>
                    <div>
                        <a href="/password/reset" className="text-small">
                            <p>Forgot Your Password?</p>
                        </a>
                    </div>
                    <div>
                        <Link to="/home/register">
                            <p>Don't have an account? Signup</p>
                        </Link>
                    </div>
                </div>
            </Card>
        </Container>
    );
};

Login.propTypes = {
    login: PropTypes.func.isRequired,
};

export default connect(
    null,
    { login }
)(Login);
