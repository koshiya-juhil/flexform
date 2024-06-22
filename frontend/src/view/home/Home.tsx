import Header from "../components/Header";
import HomeTemplate from "../components/HomeTemplate";
import RecentForms from "../components/RecentForms";

interface HomeProps {
    handleLogout: () => void;
}

const Home = (props: HomeProps) => {

    try {
        return (
            <>
                <Header
                    handleLogout={props.handleLogout}
                />
                <HomeTemplate/>
                <RecentForms/>
            </>
        )
    } catch (error) {
        console.log("error in Home.tsx ", error);
        return <></>
    }

}

export default Home