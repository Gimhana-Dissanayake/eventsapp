import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { Grid } from "semantic-ui-react";
import { getUserProfile } from "../../../app/firestore/firestoreService";
import useFirestoreDoc from "../../../app/hooks/useFirestoreDoc";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { RootState } from "../../../app/store/rootReducer";
import { listenToCurrentUserProfile } from "../profileActions";
import ProfileContent from "./ProfileContent";
import ProfileHeader from "./ProfileHeader";

const ProfilePage = (props: RouteComponentProps) => {
  const dispatch = useDispatch();

  const { currentUserProfile } = useSelector(
    (state: RootState) => state.profile
  );

  const { loading, error } = useSelector((state: RootState) => state.async);

  const params: any = props.match.params;

  useFirestoreDoc({
    query: () => getUserProfile(params.id),
    data: (profile: any) => dispatch(listenToCurrentUserProfile(profile)),
    deps: [dispatch, params.id],
  });

  if ((loading && !currentUserProfile) || (!currentUserProfile && !error))
    return <LoadingComponent content="Loading profile..." />;

  return (
    <Grid>
      <Grid.Column width={16}>
        <ProfileHeader profile={currentUserProfile} />
        <ProfileContent profile={currentUserProfile} />
      </Grid.Column>
    </Grid>
  );
};

export default ProfilePage;
