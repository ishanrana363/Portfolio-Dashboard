const FullScreenLoader = ({ visibility }) => {
    return (
        visibility === "" && ( // Show spinner only when visibility is ""
            <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
                <div className="spinner-border animate-spin inline-block w-12 h-12 border-4 rounded-full border-t-teal-500"></div>
            </div>
        )
    );
};

export default FullScreenLoader;
