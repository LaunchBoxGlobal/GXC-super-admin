import { useEffect, useState } from "react";
import PageTitle from "../../components/Common/PageTitle";
import CommunityProductList from "./CommunityProductList";
import CommunityInfo from "./CommunityInfo";
import Tabs from "./Tabs";
import MembersList from "./MembersList";
import { useParams } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import PageLoader from "../../components/Loader/PageLoader";
import PageError from "../../components/Loader/PageError";
import {
  useGetCommunityDetailsQuery,
  useUpdateCommunityStatusMutation,
} from "../../services/communityApi/communityApi";

const CommunityDetailsPage = () => {
  const [activeTab, setActiveTab] = useState("Products");
  const { communitySlug, communityId } = useParams();

  const { data, isLoading, isError, error } = useGetCommunityDetailsQuery(
    communitySlug,
    {
      skip: !communitySlug,
    }
  );

  const community = data?.data || null;

  const [updateCommunityStatus, { isLoading: enableDisableLoading }] =
    useUpdateCommunityStatusMutation();

  useEffect(() => {
    document.title = "Community Details - giveXchange";
  }, []);

  const enableDisableCommunity = async () => {
    if (!community) return;

    const status = community.community.isDeactivatedByAdmin
      ? "active"
      : "suspended";

    try {
      const res = await updateCommunityStatus({
        communityId,
        status,
      }).unwrap();

      enqueueSnackbar(res?.message, { variant: "success" });
    } catch (err) {
      enqueueSnackbar(
        err?.data?.message || "Failed to update community status",
        { variant: "error" }
      );
    }
  };

  if (isLoading) {
    return <PageLoader />;
  }

  if (isError) {
    return (
      <PageError
        errorMessage={
          error?.data?.message || error?.error || "Something went wrong"
        }
      />
    );
  }

  return (
    <div className="w-full bg-[#fff] custom-shadow rounded-[10px] p-5">
      <PageTitle title="Community Details" />

      <CommunityInfo
        community={community}
        enableDisableCommunity={enableDisableCommunity}
        enableDisableLoading={enableDisableLoading}
      />

      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

      {activeTab === "Products" ? (
        <CommunityProductList communityId={communityId} />
      ) : (
        <MembersList communityId={communityId} />
      )}
    </div>
  );
};

export default CommunityDetailsPage;
