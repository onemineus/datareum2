import { userData } from "@/types/types";
import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { BsArrowUpRight } from "react-icons/bs";
import { TiTick } from "react-icons/ti";
import { handleGetVerifiedClicked } from "@/utils/helper/handlers";
import ThemeButton from "../custom/themeButton";
const God = (props: { userData: userData; refresher: () => {} }) => {
  const router = useRouter();
  return (
    <div>
      {props.userData.isGod && (
        <div className="bg-red-90 flex w-full flex-col md:flex-row md:space-x-8">
          {/* admin panel */}
          <div className="bg-blue-90 w-full overflow-clip">
            <div className="my-4 text-xl uppercase">admin panel</div>
            <div className="w-full rounded-xl border-2 border-stone-700 bg-stone-800 bg-opacity-30 p-4 text-stone-100 backdrop-blur-md">
              <div className="flex flex-col items-center justify-between xl:flex-row">
                <div className="text-center text-lg font-bold">
                  Access the{" "}
                  <span className="font-bol capitalize">admin panel</span> now!
                </div>
                <motion.div
                  whileHover={{
                    scale: 1.05,
                  }}
                  whileTap={{
                    scale: 0.95,
                  }}
                  className="mt-4 flex cursor-pointer items-center space-x-2 rounded-lg bg-acc px-3 py-2 text-center text-sm font-bold uppercase text-stone-950 xl:mt-0"
                  onClick={() => {
                    router.push("/dashboard/admin");
                  }}
                >
                  <div>admin panel</div>
                  <BsArrowUpRight />
                </motion.div>
              </div>

              <div className="mt-4 flex justify-center">
                <div className="flex items-start">
                  <div className="-mt-1 flex shrink-0 items-start">
                    <TiTick size={28} color="#1ED760" />
                  </div>
                  <div className="text-sm">
                    You can manage the Users and do more things on the Admin
                    Panel only accessable by admins.
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* god mode */}
          <div className="bg-blue-90 w-full overflow-clip">
            <div className="my-4 text-xl uppercase">god mode</div>
            <div className="w-full rounded-xl border-2 border-stone-700 bg-stone-800 bg-opacity-30 p-4 text-stone-100 backdrop-blur-md">
              <div className="flex flex-col items-center justify-between xl:flex-row">
                <div className="text-center text-lg font-bold">
                  Activate the{" "}
                  <span className="font-bol capitalize">god mode</span> now!
                </div>
                <motion.div
                  whileHover={{
                    scale: 1.05,
                  }}
                  whileTap={{
                    scale: 0.95,
                  }}
                  className="mt-4 flex cursor-pointer items-center space-x-2 rounded-lg bg-acc px-3 py-2 text-center text-sm font-bold uppercase text-stone-950 xl:mt-0"
                  onClick={() => {
                    handleGetVerifiedClicked(props.userData, props.refresher);
                  }}
                >
                  <div>get verified</div>
                </motion.div>
              </div>
              <div className="mt-4 flex justify-center">
                <div className="flex items-start">
                  <div className="-mt-1 flex shrink-0 items-start">
                    <TiTick size={28} color="#1ED760" />
                  </div>
                  <div className="text-sm">
                    You can be a verified User and gain API access just by
                    clicking on the button.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default God;
