import React, { useEffect, useState } from 'react'
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Button, Card, CardMedia, Checkbox, FormControl, FormControlLabel, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField, Typography } from '@mui/material'
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import './Signup.css'; // Import your CSS file

const Signup = () => {
    const [form, setForm] = useState({
        Role:'User',
        Name: '',
        Place: '',
        Age: '',
        EmailId: '',
        Education: '',
        PhoneNumber: '',
        Username: '',
        Password: '',
        Cpass: '',
    });

    const [error, setError] = useState('');

    const location = useLocation();
    useEffect(() => {
        if (location.state != null) {
            setForm({
                ...form,
                Role:'User',
                Name: location.state.val.Name,
                Place: location.state.val.Place,
                Age: location.state.val.Age,
                EmailId: location.state.val.EmailId,
                Education: location.state.val.Education,
                PhoneNumber: location.state.val.PhoneNumber,
                Username: location.state.val.Username,
                Password: location.state.val.Password,
                Cpass: location.state.val.Cpass
            });
        }
    }, [location.state]);
    
    function valueCap(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const [checked, setChecked] = React.useState(false);

    const handleChange = (event) => {
        setChecked(event.target.checked);
    };

    //POST
    function valueAdd() {
        if (validatePasswords()) {
            axios.post('http://localhost:3000/adduser', form)
                .then((res) => {
                    alert('Data added');
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }

    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const validatePasswords = () => {
        if (form.Password !== form.Cpass) {
            setError('*Passwords do not match');
            return false;
        }
        setError('');
        return true;
    };

    return (
        <div className="background-image">
            <Card className="glass-card">
                
                <div className="signup-content">
                    <h3 style={{color:'green', textAlign:'center'}}><i>SIGN UP</i></h3>
                    <form>
                        <TextField
                            label="Name"
                            required
                            sx={{ m: 1, width: '100%' }}
                            name='Name'
                            onChange={valueCap}
                            value={form.Name}
                        />
                        <TextField
                            label="Place"
                            onChange={valueCap}
                            name='Place'
                            sx={{ m: 1, width: '100%' }}
                            value={form.Place}
                        />
                        <TextField
                            label="Age"
                            onChange={valueCap}
                            sx={{ m: 1, width: '100%' }}
                            name='Age'
                            value={form.Age}
                        />
                        <TextField
                            label="Email Id"
                            required
                            onChange={valueCap}
                            type='email'
                            name='EmailId'
                            value={form.EmailId}
                            sx={{ m: 1, width: '100%' }}
                        />
                        <TextField
                            label="Education"
                            name='Education'
                            value={form.Education}
                            sx={{ m: 1, width: '100%' }}
                            onChange={valueCap}
                        />
                        <TextField
                            label="Phone No"
                            name='PhoneNumber'
                            value={form.PhoneNumber}
                            onChange={valueCap}
                            sx={{ m: 1, width: '100%' }}
                        />
                        <TextField
                            label="Username"
                            required
                            name='Username'
                            value={form.Username}
                            onChange={valueCap}
                            sx={{ m: 1, width: '100%' }}
                        />
                        <FormControl sx={{ m: 1, width: '100%' }} variant="outlined">
                            <InputLabel required htmlFor="outlined-adornment-password">Password</InputLabel>
                            <OutlinedInput
                                type={showPassword ? 'text' : 'password'}
                                onChange={valueCap}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                name='Password'
                                value={form.Password}
                                label="Password"
                            />
                        </FormControl>
                        <FormControl sx={{ m: 1, width: '100%' }} variant="outlined">
                            <InputLabel required htmlFor="outlined-adornment-password">Confirm Password</InputLabel>
                            <OutlinedInput
                                required
                                type={showPassword ? 'text' : 'password'}
                                onChange={valueCap}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Confirm Password"
                                name='Cpass'
                                value={form.Cpass}
                            />
                        </FormControl>
                        {error && (
                        <Typography variant="body2" color="error" sx={{ m: 1 }}>
                            {error}
                        </Typography>
                    )}
                        <h5><u>Terms and Conditions</u></h5>
                        <h5 style={{textDecoration:'Underline',color:'blue',fontSize:'15px',cursor:'pointer'}}>* If book is not returned or damaged, a fine will be charged.</h5>
                        <FormControlLabel
                            required
                            control={<Checkbox checked={checked} onChange={handleChange} />}
                            label="Accept all Terms & Conditions"
                        />
                        <Button
                            variant="contained"
                            disabled={!checked}
                            onClick={valueAdd}
                            sx={{ m: 1, width: '100%' }}
                            className="signup-button"
                        >
                            <b>SIGN UP</b>
                        </Button>
                    </form>
                </div>
            </Card>
        </div>
    );
}

export default Signup;
