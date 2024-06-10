"use client";

import ProfileComponent from "@/components/ProfileComponent";

const ProfilePage = ({ params }: { params: { fid: string } }) => {
  return (
    <ProfileComponent fid={parseInt(params.fid)}>
      <p>Hello</p>
    </ProfileComponent>
  );
};

export default ProfilePage;
