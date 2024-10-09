
import "../../assets/style.css" ;

const SpinnerLoader = () => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
            <div className="spinner-border animate-spin w-12 h-12 border-4 rounded-full border-t-teal-500"></div>
        </div>
    );
};

export default SpinnerLoader;
