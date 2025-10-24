import { useParams } from "react-router-dom";
import PageTitle from "../../components/Common/PageTitle";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../data/baseUrl";
import { getToken } from "../../utils/getToken";
import PageLoader from "../../components/Loader/PageLoader";
import PageError from "../../components/Loader/PageError";
import Header from "./Header";

const CommunityOwnerDetailsPage = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const { ownerId } = useParams();

  const fetchUser = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/admin/users/${ownerId}`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

      // console.log("user response >>> ", response?.data);
      setUser(response?.data?.data?.user);
    } catch (error) {
      console.log("User error >>", error);
      setError(
        error?.response?.data?.message ||
          error?.message ||
          "Something went wrong!"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = "User Details - GiveXChange";
    fetchUser();
  }, []);

  if (loading) return <PageLoader />;
  if (error) return <PageError errorMessage={error} />;
  return (
    <div className="w-full relative bg-white rounded-[10px]">
      <div className="w-full bg-white custom-shadow p-5 rounded-[10px]">
        <PageTitle title={`Community Owner Details`} />

        <Header user={user} fetchUser={fetchUser} />
      </div>
    </div>
  );
};

export default CommunityOwnerDetailsPage;
