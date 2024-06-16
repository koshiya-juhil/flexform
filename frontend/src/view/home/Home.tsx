import Header from "../components/Header";
import HomeTemplate from "../components/HomeTemplate";
import RecentForms from "../components/RecentForms";

const Home = () => {

    try {
        return (
            <>
                <Header/>
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