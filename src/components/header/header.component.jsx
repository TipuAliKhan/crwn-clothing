import React from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';

import { auth } from '../../firebase/firebase.utils';

import { ReactComponent as Logo } from '../../assests/crown.svg';
import './header.styles.scss';
import FormInput from '../form-input/form-input.component';

const Header = ({ currentUser }) => (
    <div className='header'>
        <Link className='logo-container' to='/'>
            <Logo className='logo' />
        </Link>
        <div className='options'>
            <Link className='option' to='/shop'>
                SHOP
            </Link>
            <Link className='option' to='/contact'>
                CONTACT
            </Link>
            {currentUser ?
                (<div className='option' onClick={() => auth.signOut()}>SIGN OUT</div>)
                :
                (<Link className='option' to='/signin'>
                    SIGN IN
                </Link>)}
        </div>
    </div>
)

const mmapStateToProps = state => ({
    currentUser: state.user.currentUser
})

export default connect(mmapStateToProps)(Header);