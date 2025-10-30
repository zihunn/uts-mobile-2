import React, { useRef } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  Platform,
  Pressable,
  Animated,
} from "react-native";
import { Stack } from "expo-router";
import { IconSymbol } from "@/components/IconSymbol";
import { GlassView } from "expo-glass-effect";
import { useTheme } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import * as Haptics from "expo-haptics";

// Project data type
interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  icon: string;
  color: string;
  gradient: string[];
}

export default function ProjectsScreen() {
  const theme = useTheme();
  const scrollY = useRef(new Animated.Value(0)).current;

  // Hardcoded project data with gradients
  const projects: Project[] = [
    {
      id: "1",
      name: "Chat App",
      description:
        "Aplikasi chat real-time menggunakan Flutter dan Firebase untuk komunikasi dan pengelolaan data pengguna.",
      technologies: ["Flutter", "Firebase", "Dart"],
      icon: "message.fill",
      color: "#FF3B30",
      gradient: ["#FF3B30", "#D12A24"],
    },
    {
      id: "2",
      name: "Landing Page",
      description:
        "Sebuah landing page yang dibangun menggunakan Laravel untuk kebutuhan promosi atau informasi produk.",
      technologies: ["Laravel", "HTML", "CSS", "JavaScript"],
      icon: "house.fill",
      color: "#007BFF",
      gradient: ["#007BFF", "#0056B3"],
    },
    {
      id: "3",
      name: "Digital Askep",
      description:
        "Aplikasi Digital Askep yang dibangun menggunakan Flutter untuk frontend dan Laravel untuk API backend untuk mengelola data pasien.",
      technologies: ["Flutter", "Laravel", "Firebase"],
      icon: "book.fill",
      color: "#4CAF50",
      gradient: ["#4CAF50", "#388E3C"],
    },
    {
      id: "4",
      name: "HDCare",
      description:
        "Aplikasi HDCare menggunakan Flutter untuk frontend dan Laravel untuk backend, menyediakan fitur untuk memantau kesehatan dan informasi medis.",
      technologies: ["Flutter", "Laravel", "API Integration"],
      icon: "heart.fill",
      color: "#FF4081",
      gradient: ["#FF4081", "#F50057"],
    },
    {
      id: "5",
      name: "Penjualan eSIM dan Reseller",
      description:
        "Sistem penjualan eSIM dan manajemen reseller dengan API backend yang dibangun menggunakan Laravel.",
      technologies: ["Laravel", "API Integration", "MySQL"],
      icon: "phone.fill",
      color: "#00C853",
      gradient: ["#00C853", "#00B651"],
    },
  ];

  // Header parallax effect
  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0.8],
    extrapolate: "clamp",
  });

  return (
    <>
      {Platform.OS === "ios" && (
        <Stack.Screen
          options={{
            title: "Proyek Saya",
            headerLargeTitle: true,
          }}
        />
      )}
      <View style={[styles.container, { backgroundColor: "#FFFFFF" }]}>
        <Animated.ScrollView
          contentContainerStyle={[
            styles.scrollContent,
            Platform.OS !== "ios" && styles.scrollContentWithTabBar,
          ]}
          showsVerticalScrollIndicator={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true }
          )}
          scrollEventThrottle={16}
        >
          {/* Header with Animation */}
          <Animated.View style={[styles.header, { opacity: headerOpacity }]}>
            <Text style={[styles.headerTitle, { color: "#000000" }]}>
              Portofolio Proyek
            </Text>
            <Text style={[styles.headerSubtitle, { color: "#666" }]}>
              Berikut adalah beberapa proyek yang telah saya kerjakan
            </Text>
          </Animated.View>

          {/* Projects List with Staggered Animation */}
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              theme={theme}
            />
          ))}

          {/* Footer */}
          <GlassView
            style={[
              styles.footerCard,
              Platform.OS !== "ios" && { backgroundColor: "rgba(0,0,0,0.05)" },
            ]}
            glassEffectStyle="regular"
          >
            <View
              style={[
                styles.footerIcon,
                { backgroundColor: theme.colors.primary + "20" },
              ]}
            >
              <IconSymbol
                name="checkmark.circle.fill"
                size={32}
                color={theme.colors.primary}
              />
            </View>
            <Text style={[styles.footerTitle, { color: "#000000" }]}>
              {projects.length} Proyek Selesai
            </Text>
            <Text style={[styles.footerText, { color: "#666" }]}>
              Terus berkembang dan belajar teknologi baru
            </Text>
          </GlassView>
        </Animated.ScrollView>
      </View>
    </>
  );
}

// Project Card Component with Press Animation
function ProjectCard({
  project,
  index,
  theme,
}: {
  project: Project;
  index: number;
  theme: any;
}) {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      delay: index * 100,
      useNativeDriver: true,
    }).start();
  }, []);

  const handlePressIn = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    Animated.spring(scaleAnim, {
      toValue: 0.97,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View
      style={{
        opacity: fadeAnim,
        transform: [{ scale: scaleAnim }],
      }}
    >
      <Pressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={() => {
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
          console.log("Project pressed:", project.name);
        }}
      >
        <GlassView
          style={[
            styles.projectCard,
            Platform.OS !== "ios" && { backgroundColor: "rgba(0,0,0,0.05)" },
          ]}
          glassEffectStyle="regular"
        >
          {/* Project Icon with Gradient */}
          <LinearGradient
            colors={project.gradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.projectIcon}
          >
            <IconSymbol name={project.icon} size={32} color="white" />
          </LinearGradient>

          {/* Project Content */}
          <View style={styles.projectContent}>
            {/* Project Number Badge */}
            <View
              style={[
                styles.projectBadge,
                { backgroundColor: theme.colors.primary + "20" },
              ]}
            >
              <Text
                style={[styles.projectNumber, { color: theme.colors.primary }]}
              >
                #{index + 1}
              </Text>
            </View>

            {/* Project Name */}
            <Text style={[styles.projectName, { color: "#000000" }]}>
              {project.name}
            </Text>

            {/* Project Description */}
            <Text style={[styles.projectDescription, { color: "#666" }]}>
              {project.description}
            </Text>

            {/* Technologies */}
            <View style={styles.technologiesContainer}>
              <View style={styles.techHeader}>
                <IconSymbol
                  name="hammer.fill"
                  size={16}
                  color={theme.colors.primary}
                />
                <Text
                  style={[styles.techLabel, { color: theme.colors.primary }]}
                >
                  Teknologi
                </Text>
              </View>
              <View style={styles.techTags}>
                {project.technologies.map((tech, techIndex) => (
                  <View
                    key={techIndex}
                    style={[
                      styles.techTag,
                      {
                        backgroundColor: "rgba(0,0,0,0.04)",
                        borderColor: project.color + "40",
                      },
                    ]}
                  >
                    <Text style={[styles.techText, { color: "#000000" }]}>
                      {tech}
                    </Text>
                  </View>
                ))}
              </View>
            </View>

            {/* View Details Button */}
            <View style={styles.viewDetailsContainer}>
              <Text
                style={[
                  styles.viewDetailsText,
                  { color: theme.colors.primary },
                ]}
              >
                Lihat Detail
              </Text>
              <IconSymbol
                name="arrow.right"
                size={16}
                color={theme.colors.primary}
              />
            </View>
          </View>
        </GlassView>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingTop: Platform.OS === "ios" ? 0 : 16,
  },
  scrollContentWithTabBar: {
    paddingBottom: 100,
  },
  header: {
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    lineHeight: 24,
  },
  projectCard: {
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
  },
  projectIcon: {
    width: 64,
    height: 64,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  projectContent: {
    gap: 12,
  },
  projectBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  projectNumber: {
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  projectName: {
    fontSize: 22,
    fontWeight: "bold",
  },
  projectDescription: {
    fontSize: 15,
    lineHeight: 24,
  },
  technologiesContainer: {
    marginTop: 4,
    gap: 10,
  },
  techHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  techLabel: {
    fontSize: 14,
    fontWeight: "700",
  },
  techTags: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  techTag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
  },
  techText: {
    fontSize: 13,
    fontWeight: "600",
  },
  viewDetailsContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 4,
  },
  viewDetailsText: {
    fontSize: 15,
    fontWeight: "600",
  },
  footerCard: {
    borderRadius: 20,
    padding: 24,
    alignItems: "center",
    marginTop: 8,
    marginBottom: 16,
  },
  footerIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  footerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 6,
  },
  footerText: {
    fontSize: 14,
    textAlign: "center",
  },
});
