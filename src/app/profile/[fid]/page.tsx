"use client";

import ProfileComponent from "@/components/ProfileComponent";

const ProfilePage = ({ params }: { params: { fid: string; }; }) => {
  return (
    <div className="w-full">
      <ProfileComponent fid={parseInt(params.fid)}>
        <></>
      </ProfileComponent>
    </div>
  );
};

export default ProfilePage;
