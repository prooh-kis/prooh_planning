interface InterestCounts1 {
  screens: string[];
  count: number;
  intrest: string;
}
export function filterScreensByInterests(screens: any, interests: string[]) {
  console.log("filterScreensByInterests", interests.length, screens.length);
  const hasAllInterests = (poi: string[]) =>
    interests?.every((interest) => poi?.includes(interest));
  const hasAnyInterest = (poi: string[]) =>
    interests?.some((interest) => poi?.includes(interest));
  // const interestCounts = Array(interests.length).fill(0);
  const interestCounts1: InterestCounts1[] = interests?.map(
    (intrest: string) => {
      return {
        screens: [],
        count: 0,
        intrest,
      };
    }
  );

  const screensWithAllInterests = screens?.filter((screen: any) =>
    hasAllInterests(screen?.location.pointOfInterest)
  );
  const screensWithAnyInterest = screens?.filter((screen: any) =>
    hasAnyInterest(screen?.location.pointOfInterest)
  );

  screens?.forEach((screen: any) => {
    const matchCount = interests?.filter((interest) =>
      screen?.location.pointOfInterest.includes(interest)
    )?.length;
    if (matchCount > 0) {
      interestCounts1[matchCount - 1].count += 1;
      interestCounts1[matchCount - 1].screens.push(screen?.screenId);
      // interestCounts[matchCount - 1]++;
    }
  });

  return {
    screensWithAllInterests,
    screensWithAnyInterest,
    interestCounts: interestCounts1,
  };
}

export function filterScreensByLatLong(data: any) {
  // console.log(data);
  const result = data.reduce((acc: any, item: any) => {
    const screenCount = item.screens.length;

    if (!acc[screenCount]) {
      acc[screenCount] = {
        count: 0,
        screens: [],
        coordinates: []
      };
    }

    acc[screenCount].count++;
    const screens = item.screens.map((screen: any) => screen);
    acc[screenCount].screens.push(screens);
    acc[screenCount].coordinates.push(item.coordinate);
    return acc;
  }, {});
  // console.log(result);
  return result
}


export const getUniqueScreens = (data: any) => {
  const uniqueScreens = new Set();
  if (data) {
    data?.forEach((location: any) => {
      location?.screens?.forEach((screen: any) => {
        uniqueScreens.add(screen);
      });
    });
  }

  let result = Array.from(uniqueScreens);

  return result;
};