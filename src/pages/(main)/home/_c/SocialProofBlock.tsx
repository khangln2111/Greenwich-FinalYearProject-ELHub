import CountUp from "react-countup";
import { motion } from "framer-motion";
import HomePageBlockWrapper from "./HomePageBlockWrapper";
import { Users, GraduationCap, Star, BookOpen } from "lucide-react";

const SocialProofBlock = () => {
  const stats = [
    {
      label: "Instructors",
      value: 800,
      suffix: "+",
      desc: "Experts sharing their knowledge",
      icon: GraduationCap,
      color: "from-blue-500 to-blue-400", // gradient background
      iconBg: "bg-blue-100 dark:bg-blue-800",
      iconColor: "text-blue-600 dark:text-blue-200",
    },
    {
      label: "Learners",
      value: 75000,
      suffix: "+",
      desc: "Active students worldwide",
      icon: Users,
      color: "from-emerald-500 to-emerald-400",
      iconBg: "bg-emerald-100 dark:bg-emerald-800",
      iconColor: "text-emerald-600 dark:text-emerald-200",
    },
    {
      label: "Average Rating",
      value: 4.8,
      suffix: "/5",
      decimals: 1,
      desc: "Based on student feedback",
      icon: Star,
      color: "from-amber-400 to-amber-300",
      iconBg: "bg-amber-100 dark:bg-amber-800",
      iconColor: "text-amber-600 dark:text-amber-200",
    },
    {
      label: "Courses Published",
      value: 1200,
      suffix: "+",
      desc: "Diverse topics to explore",
      icon: BookOpen,
      color: "from-indigo-500 to-indigo-400",
      iconBg: "bg-indigo-100 dark:bg-indigo-800",
      iconColor: "text-indigo-600 dark:text-indigo-200",
    },
  ];

  return (
    <HomePageBlockWrapper
      className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-gray-100 dark:from-slate-900
        dark:via-gray-900 dark:to-slate-950"
      classNames={{
        container: "flex flex-col items-center text-center gap-12 px-4",
      }}
    >
      {/* Heading */}
      <div className="max-w-2xl">
        <h2 className="text-3xl md:text-4xl font-extrabold text-primary-9 dark:text-primary-1">
          Join Our Thriving Community
        </h2>
        <p className="mt-4 text-lg text-primary-7 dark:text-primary-2">
          Numbers that show how learners and instructors grow with our platform.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl w-full">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={
                "flex flex-col items-center rounded-xl shadow-lg border p-8 bg-white dark:bg-slate-800"
              }
            >
              {/* Icon */}
              <div
                className={`w-16 h-16 flex items-center justify-center rounded-full mb-5 ${stat.iconBg}`}
              >
                <Icon className={`w-8 h-8 ${stat.iconColor}`} />
              </div>
              {/* Number */}
              <div
                className={`text-4xl md:text-5xl font-extrabold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}
              >
                <CountUp
                  end={stat.value}
                  duration={2.5}
                  separator=","
                  decimals={stat.decimals ?? 0}
                />
                {stat.suffix}
              </div>
              {/* Label */}
              <div className="mt-3 text-base md:text-lg font-semibold text-primary-900 dark:text-white">
                {stat.label}
              </div>
              <p className="mt-1 text-sm text-primary-7 dark:text-primary-3">{stat.desc}</p>
            </motion.div>
          );
        })}
      </div>
    </HomePageBlockWrapper>
  );
};

export default SocialProofBlock;
