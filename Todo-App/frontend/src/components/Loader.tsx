import { MutatingDots } from "react-loader-spinner";

const Loader = () => {
    return (
        <div className="flex justify-center">
            <MutatingDots
                visible={true}
                height="100"
                width="100"
                color="hsl(220, 98%, 61%)"
                secondaryColor="hsl(220, 98%, 61%)"
                radius="12.5"
                ariaLabel="mutating-dots-loading"
                wrapperStyle={{}}
                wrapperClass=""
            />
        </div>
    );
};

export default Loader;
