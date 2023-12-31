"use client";

import { useAuth } from "@/context/context";
import { getDashUserData } from "@/utils/helper/helpers";
import { userData } from "@/types/types";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import Papa from "papaparse";
import { unSigner } from "@/firebase/firebase";
import Container from "@/components/containers/container";
import AdminHeader from "@/components/headers/adminHeader";
import { IoCloudUpload } from "react-icons/io5";
import {
  analyzeObjectList,
  calculateColumnCounts,
  processCsvData,
} from "@/components/contribute/csvHelpers/csvHelpers";
import { QuickStatsSection } from "@/components/contribute/quickStatsSection";
import { AnalyticsSection } from "@/components/contribute/analyticsSection";
import { RetentionSection } from "@/components/contribute/retentionSection";
import { FeedbackSection } from "@/components/contribute/feedbackSection";
import { AcceptButton } from "@/components/contribute/acceptButton";
import Spinner from "@/components/loaders/spinner";

const Contribute = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [graphData, setGraphData] = useState<object[]>([]);
  const fileRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userData, setUserData] = useState<userData | undefined>(undefined);
  const [file, setFile] = useState<null | File>(null);
  const [rawData, setRawData] = useState<object[] | null>(null);
  const [parsedData, setParsedData] = useState<object[] | null>(null);
  const [rawStats, setRawStats] = useState<{
    objectCount: number;
    shortestObjectLength: number;
    longestObjectLength: number;
  } | null>(null);
  const [parsedStats, setParsedStats] = useState<{
    objectCount: number;
    shortestObjectLength: number;
    longestObjectLength: number;
  } | null>(null);
  const waiter = async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    setIsLoading(false);
  };
  const setUserDataHelper = async () => {
    const data = await getDashUserData(user!);
    setUserData(data);
  };
  const onFileChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (
      selectedFile?.type === "text/csv" ||
      selectedFile?.type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
      setFile(selectedFile);
      if (selectedFile) {
        Papa.parse(selectedFile, {
          header: true,
          skipEmptyLines: true,
          complete: (result) => {
            const data: any = result.data;
            setRawData(data);
            console.log(data);
            const rawAnalytics = analyzeObjectList(data);
            setRawStats(rawAnalytics);
            if (typeof data === "object") {
              const processed = processCsvData(data);
              console.log(processed);
              setParsedData(processed);
              const parsedAnalytics = analyzeObjectList(processed);
              setParsedStats(parsedAnalytics);
              setGraphData(calculateColumnCounts(data, processed));
            }
          },
        });
      }
    } else {
      console.log("wrong format");
    }
  };

  useEffect(() => {
    waiter();
    if (!user && !isLoading) {
      router.push("/");
    } else {
      setUserDataHelper();
    }
  }, [user, isLoading]);

  return !userData ? (
    <Spinner />
  ) : !userData.canContribute ? (
    <div className="flex h-screen items-center justify-center bg-zinc-950">
      <div className="flex flex-col items-center justify-center text-zinc-50">
        <div className="text-2xl">
          Are you a <span className="font-bold">Hacker</span>?
        </div>
        <div className="text-xl">{"- nah!"}</div>
        <div className="text-2xl">
          Go back{" "}
          <span
            className="cursor-pointer underline"
            onClick={() => {
              router.push("/");
            }}
          >
            home.
          </span>
        </div>
      </div>
    </div>
  ) : (
    <div className="relative min-h-screen w-full">
      <AdminHeader />
      {file ? (
        // has file
        <div className="mih-h-screen flex w-full flex-col items-center bg-stone-950 pt-20">
          <div className="h-full w-full max-w-6xl p-4">
            <div className="bg-red-95 h-full">
              {/* stats */}
              <QuickStatsSection
                rawData={rawData}
                parsedData={parsedData}
                rawStats={rawStats}
                parsedStats={parsedStats}
              />

              <AnalyticsSection rawData={rawData} parsedData={parsedData} />

              <RetentionSection rawStats={rawStats} parsedStats={parsedStats} />
              <FeedbackSection rawStats={rawStats} parsedStats={parsedStats} />
              <AcceptButton parsedData={parsedData} userData={userData} />
            </div>
          </div>
        </div>
      ) : (
        // no file
        <div className="flex h-screen w-full flex-col items-center bg-stone-950 pt-20">
          <div className="h-full w-full max-w-6xl p-4">
            <div
              onClick={(event) => {
                fileRef.current?.click();
              }}
              className="relative flex h-full items-center justify-center rounded-xl bg-stone-800 bg-opacity-30 outline outline-2 outline-stone-700 backdrop-blur-md"
            >
              <div className="flex flex-col items-center">
                <div className="w-24">
                  <IoCloudUpload className="h-full w-full" color={"#facc15"} />
                </div>
                <div>Select your file to get started</div>
              </div>
              <div className="absolute bottom-0 right-0 mx-2 my-1 text-sm">
                .csv only
              </div>
            </div>
          </div>
          <input
            ref={fileRef}
            onChange={onFileChangeHandler}
            type="file"
            name="file"
            className="hidden"
            accept=".csv"
          />
        </div>
      )}
    </div>
  );
};

export default Contribute;
