import {FC} from "react";
import {Button} from "shared/Button";
import {useNavigate} from "react-router-dom";

interface NotFoundPageProps {}
export const NotFoundPage:FC<NotFoundPageProps> = () => {
    const navigation = useNavigate();
    return (
        <div style={{ textAlign: 'center', marginTop: '50px', color: "var(--text-primary)" }}>
            <h1>404 - Page Not Found</h1>
            <p>Oops! The page you're looking for doesn't exist.</p>
            <Button onClick={() =>navigation("/")}>Go back to main Page</Button>
        </div>
    );
};