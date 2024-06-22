import Header from "../components/Header";
import HomeTemplate from "../components/HomeTemplate";
import RecentForms from "../components/RecentForms";

interface HomeProps {
    handleLogout: () => void;
    searchQuery: string;
    handleSearchQuery: (value: string) => void;
}

const Home = (props: HomeProps) => {

    try {
        return (
            <>
                <Header
                    handleLogout={props.handleLogout}
                    searchQuery={props.searchQuery}
                    handleSearchQuery={props.handleSearchQuery}
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