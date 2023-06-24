import {
    useLocation,
    useNavigate,
    useParams
} from "react-router-dom";

export function withRouter<WCP>(WrappedComponent: React.ComponentType<WCP>) {
    function ComponentWithRouterProp(props: any) {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();
        return (
            <WrappedComponent
                {...props as WCP}
                router={{ location, navigate, params }}
            />
        );
    }

    return ComponentWithRouterProp;
}

export default withRouter
