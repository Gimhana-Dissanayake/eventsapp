import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { Grid } from "semantic-ui-react";
import { getUserProfile } from "../../../app/firestore/firestoreService";
import useFirestoreDoc from "../../../app/hooks/useFirestoreDoc";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { RootState } from "../../../app/store/rootReducer";
import { listenToSelectedUserProfile } from "../profileActions";
import ProfileContent from "./ProfileContent";
import ProfileHeader from "./ProfileHeader";

const ProfilePage = (props: RouteComponentProps) => {
  const dispatch = useDispatch();

  const { selectedUserProfile } = useSelector(
    (state: RootState) => state.profile
  );
  const { currentUser } = useSelector((state: RootState) => state.auth);
  const { loading, error } = useSelector((state: RootState) => state.async);

  const params: any = props.match.params;

  useFirestoreDoc({
    query: () => getUserProfile(params.id),
    data: (profile: any) => dispatch(listenToSelectedUserProfile(profile)),
    deps: [dispatch, params.id],
  });

  if ((loading && !selectedUserProfile) || (!selectedUserProfile && !error))
    return <LoadingComponent content="Loading profile..." />;

  return (
    <Grid>
      <Grid.Column width={16}>
        <ProfileHeader
          profile={selectedUserProfile}
          isCurrentUser={currentUser.uid === selectedUserProfile.id}
        />
        <ProfileContent
          profile={selectedUserProfile}
          isCurrentUser={currentUser.uid === selectedUserProfile.id}
        />
      </Grid.Column>
    </Grid>
  );
};

export default ProfilePage;
