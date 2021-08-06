import { formatDistance } from "date-fns";

const dateUtils = {
  timeAgo(date: Date | number) {
    return formatDistance(date, new Date(), { addSuffix: true });
  },
};

export default dateUtils;