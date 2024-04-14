import { useAuth } from "../store/auth";

export const About = () => {
    const {user} = useAuth();

    return (
        <>
            <h3>Welcome, {user ? user.username : "to our website"}</h3>
            <h1>Why Choose Us?</h1>
        </>
    )
};