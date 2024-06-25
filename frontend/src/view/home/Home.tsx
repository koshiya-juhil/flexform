import Header from "../components/Header";
import HomeTemplate from "../components/HomeTemplate";
import RecentForms from "../components/RecentForms";

interface HomeProps {
    searchQuery: string;
    handleSearchQuery: (value: string) => void;
    handleDeleteForm: (formId: string) => void;
}

const Home = (props: HomeProps) => {

    try {
        return (
            <>
                <Header
                    searchQuery={props.searchQuery}
                    handleSearchQuery={props.handleSearchQuery}
                />
                <HomeTemplate/>
                <RecentForms
                    handleDeleteForm={props.handleDeleteForm}
                />
            </>
        )
    } catch (error) {
        console.log("error in Home.tsx ", error);
        return <></>
    }

}

export default Home