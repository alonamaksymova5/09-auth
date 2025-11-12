import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="auth-layout">{children}</div>;
}

//стилі?
//.mainContainer {
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   min-height: 100vh;
//   background-color: колір;
// }

// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";

// type Props = {
//   children: React.ReactNode;
// };

// export default function PublicLayout({ children }: Props) {
//   const [loading, setLoading] = useState(true);

//   const router = useRouter();

//   useEffect(() => {
//     // refresh викличе перезавантаження даних
//     router.refresh();
//     setLoading(false);
//   }, [router]);

//   return <>{loading ? <div>Loading...</div> : children}</>;
// }
