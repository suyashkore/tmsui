// project imports
import logo from 'assets/images/logo.png';

const Logo = () => {
    return (
        <img src={logo} alt="Swatpro" height="32" width="32" />
    );
};

export const Logo64 = () => {
    return (
        <img src={logo} alt="Swatpro" height="64" width="64" />
    );
};

export default Logo;
