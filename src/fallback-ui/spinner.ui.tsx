// import { ReactComponent as Logo } from 'assets/icons/logo-whitebg.svg';
const Spinner = () => {
    return (
        <div className="fixed animate-fade-in top-0 left-0 backdrop-blur-sm bg-black/30 w-screen h-screen flex justify-center items-center z-30">
            <div className="animate-spin rounded-full h-44 w-44 border-t-2 border-b-2 border-primary" />
        </div>
    );
};

export default Spinner;
