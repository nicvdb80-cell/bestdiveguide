"use client";

import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { useState } from "react";
import { useForm } from "react-hook-form";
type Step = "profile" | "visit" | "scores" | "sustainability" | "confirm";
const CERT_AGENCIES = ["PADI", "SSI", "RAID", "NAUI", "CMAS", "BSAC", "Other"];
const VOTER_ROLES = [
  { value: "recreational_diver", label: "Recreational Diver" },
  { value: "professional_diver", label: "Professional Diver" },
  { value: "dive_instructor", label: "Dive Instructor" },
  { value: "underwater_photographer", label: "Underwater Photographer" },
  { value: "chef", label: "Chef / Food Professional" },
  { value: "travel_professional", label: "Travel / Hospitality Professional" },
  { value: "guest", label: "Guest / Traveller" },
];
function ScoreField({
  label,
  name,
  register,
}: {
  label: string;
  name: string;
  register: any;
}) {
  return (
    <div style={{ marginBottom: "1rem" }}>
      {" "}
      <label
        style={{
          display: "block",
          fontSize: "14px",
          color: "#444",
          marginBottom: "6px",
        }}
      >
        {label}
      </label>{" "}
      <div style={{ display: "flex", gap: "6px" }}>
        {" "}
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
          <label
            key={n}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "2px",
              cursor: "pointer",
            }}
          >
            {" "}
            <input
              type="radio"
              value={n}
              {...register(name, { required: true })}
              style={{ accentColor: "#1B6CA8" }}
            />{" "}
            <span style={{ fontSize: "11px", color: "#888" }}>{n}</span>{" "}
          </label>
        ))}{" "}
      </div>{" "}
    </div>
  );
}
export default function VotePage() {
  const [step, setStep] = useState<Step>("profile");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { register, handleSubmit, watch, getValues } = useForm();
  const votedDive = watch("voted_dive");
  const votedFood = watch("voted_food");
  const votedStay = watch("voted_stay");
  const steps: Step[] = [
    "profile",
    "visit",
    "scores",
    "sustainability",
    "confirm",
  ];
  const stepIndex = steps.indexOf(step);
  const progress = ((stepIndex + 1) / steps.length) * 100;
  const next = () => setStep(steps[stepIndex + 1]);
  const back = () => setStep(steps[stepIndex - 1]);
  const onSubmit = async (data: any) => {
    setError(null);
    try {
      const res = await fetch(
        "https://flhsqerpikhihtirfutu.supabase.co/functions/v1/submit-vote",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...data,
            logged_dives: parseInt(data.logged_dives ?? "0"),
          }),
        },
      );
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      setSubmitted(true);
    } catch (e: any) {
      setError(e.message);
    }
  };
  if (submitted) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#F5F0E8",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
        }}
      >
        {" "}
        <div
          style={{
            background: "white",
            borderRadius: "16px",
            padding: "3rem",
            maxWidth: "520px",
            textAlign: "center",
            boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
          }}
        >
          {" "}
          <div style={{ fontSize: "56px", marginBottom: "1rem" }}></div>{" "}
          <h1
            style={{ fontSize: "24px", color: "#0A2342", marginBottom: "1rem" }}
          >
            Vote received!
          </h1>{" "}
          <p
            style={{ color: "#555", lineHeight: "1.7", marginBottom: "1.5rem" }}
          >
            {" "}
            Thank you for sharing your experience. Our team will review your
            submission and proof of visit. Once verified, your vote will count
            in the ranking.{" "}
          </p>{" "}
          <p
            style={{
              color: "#0097A7",
              fontStyle: "italic",
              marginBottom: "2rem",
            }}
          >
            A confirmation email is on its way.
          </p>{" "}
          <a
            href="/"
            style={{
              background: "#0A2342",
              color: "white",
              padding: "12px 28px",
              borderRadius: "8px",
              textDecoration: "none",
              fontWeight: "600",
            }}
          >
            {" "}
            Back to Best Dive Guide{" "}
          </a>{" "}
        </div>{" "}
      </div>
    );
  }
  return (
    <div style={{ minHeight: "100vh", background: "#F5F0E8" }}>
      <Nav />
      <div
        style={{ maxWidth: "680px", margin: "0 auto", padding: "3rem 1.5rem" }}
      >
        {" "}
        {/* Progress */}{" "}
        <div style={{ marginBottom: "2rem" }}>
          {" "}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "12px",
              color: "#888",
              marginBottom: "8px",
            }}
          >
            {" "}
            <span>
              Step {stepIndex + 1} of {steps.length}
            </span>{" "}
            <span style={{ textTransform: "capitalize" }}>
              {step.replace("_", " ")}
            </span>{" "}
          </div>{" "}
          <div
            style={{
              background: "#E0E0E0",
              borderRadius: "4px",
              height: "4px",
            }}
          >
            {" "}
            <div
              style={{
                background: "#1B6CA8",
                width: `${progress}%`,
                height: "100%",
                borderRadius: "4px",
                transition: "width 0.3s",
              }}
            />{" "}
          </div>{" "}
        </div>{" "}
        <div
          style={{
            background: "white",
            borderRadius: "16px",
            padding: "2.5rem",
            boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
          }}
        >
          {" "}
          <form onSubmit={handleSubmit(onSubmit)}>
            {" "}
            {/* STEP 1: Voter Profile */}{" "}
            {step === "profile" && (
              <>
                {" "}
                <h2
                  style={{
                    fontSize: "22px",
                    color: "#0A2342",
                    marginBottom: "0.5rem",
                  }}
                >
                  About you
                </h2>{" "}
                <p
                  style={{
                    color: "#666",
                    fontSize: "14px",
                    marginBottom: "2rem",
                  }}
                >
                  Your profile helps us weight your vote fairly. All details are
                  kept private.
                </p>{" "}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "1rem",
                  }}
                >
                  {" "}
                  <div>
                    {" "}
                    <label
                      style={{
                        display: "block",
                        fontSize: "13px",
                        fontWeight: "600",
                        color: "#333",
                        marginBottom: "5px",
                      }}
                    >
                      Full name *
                    </label>{" "}
                    <input
                      {...register("full_name", { required: true })}
                      style={{
                        width: "100%",
                        padding: "10px 12px",
                        border: "1px solid #ddd",
                        borderRadius: "6px",
                        fontSize: "14px",
                      }}
                    />{" "}
                  </div>{" "}
                  <div>
                    {" "}
                    <label
                      style={{
                        display: "block",
                        fontSize: "13px",
                        fontWeight: "600",
                        color: "#333",
                        marginBottom: "5px",
                      }}
                    >
                      Email *
                    </label>{" "}
                    <input
                      type="email"
                      {...register("email", { required: true })}
                      style={{
                        width: "100%",
                        padding: "10px 12px",
                        border: "1px solid #ddd",
                        borderRadius: "6px",
                        fontSize: "14px",
                      }}
                    />{" "}
                  </div>{" "}
                  <div>
                    {" "}
                    <label
                      style={{
                        display: "block",
                        fontSize: "13px",
                        fontWeight: "600",
                        color: "#333",
                        marginBottom: "5px",
                      }}
                    >
                      Country of residence
                    </label>{" "}
                    <input
                      {...register("country")}
                      style={{
                        width: "100%",
                        padding: "10px 12px",
                        border: "1px solid #ddd",
                        borderRadius: "6px",
                        fontSize: "14px",
                      }}
                    />{" "}
                  </div>{" "}
                  <div>
                    {" "}
                    <label
                      style={{
                        display: "block",
                        fontSize: "13px",
                        fontWeight: "600",
                        color: "#333",
                        marginBottom: "5px",
                      }}
                    >
                      Your profession
                    </label>{" "}
                    <input
                      {...register("daily_profession")}
                      placeholder="e.g. chef, photographer, teacher"
                      style={{
                        width: "100%",
                        padding: "10px 12px",
                        border: "1px solid #ddd",
                        borderRadius: "6px",
                        fontSize: "14px",
                      }}
                    />{" "}
                  </div>{" "}
                </div>{" "}
                <div style={{ marginTop: "1rem" }}>
                  {" "}
                  <label
                    style={{
                      display: "block",
                      fontSize: "13px",
                      fontWeight: "600",
                      color: "#333",
                      marginBottom: "5px",
                    }}
                  >
                    Your role
                  </label>{" "}
                  <select
                    {...register("voter_role", { required: true })}
                    style={{
                      width: "100%",
                      padding: "10px 12px",
                      border: "1px solid #ddd",
                      borderRadius: "6px",
                      fontSize: "14px",
                    }}
                  >
                    {" "}
                    <option value="">Select role...</option>{" "}
                    {VOTER_ROLES.map((r) => (
                      <option key={r.value} value={r.value}>
                        {r.label}
                      </option>
                    ))}{" "}
                  </select>{" "}
                </div>{" "}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr",
                    gap: "1rem",
                    marginTop: "1rem",
                  }}
                >
                  {" "}
                  <div>
                    {" "}
                    <label
                      style={{
                        display: "block",
                        fontSize: "13px",
                        fontWeight: "600",
                        color: "#333",
                        marginBottom: "5px",
                      }}
                    >
                      Cert agency
                    </label>{" "}
                    <select
                      {...register("cert_agency")}
                      style={{
                        width: "100%",
                        padding: "10px 12px",
                        border: "1px solid #ddd",
                        borderRadius: "6px",
                        fontSize: "14px",
                      }}
                    >
                      {" "}
                      <option value="">Select...</option>{" "}
                      {CERT_AGENCIES.map((a) => (
                        <option key={a} value={a}>
                          {a}
                        </option>
                      ))}{" "}
                    </select>{" "}
                  </div>{" "}
                  <div>
                    {" "}
                    <label
                      style={{
                        display: "block",
                        fontSize: "13px",
                        fontWeight: "600",
                        color: "#333",
                        marginBottom: "5px",
                      }}
                    >
                      Cert level
                    </label>{" "}
                    <input
                      {...register("cert_level")}
                      placeholder="e.g. Divemaster"
                      style={{
                        width: "100%",
                        padding: "10px 12px",
                        border: "1px solid #ddd",
                        borderRadius: "6px",
                        fontSize: "14px",
                      }}
                    />{" "}
                  </div>{" "}
                  <div>
                    {" "}
                    <label
                      style={{
                        display: "block",
                        fontSize: "13px",
                        fontWeight: "600",
                        color: "#333",
                        marginBottom: "5px",
                      }}
                    >
                      Logged dives
                    </label>{" "}
                    <input
                      type="number"
                      {...register("logged_dives")}
                      min="0"
                      style={{
                        width: "100%",
                        padding: "10px 12px",
                        border: "1px solid #ddd",
                        borderRadius: "6px",
                        fontSize: "14px",
                      }}
                    />{" "}
                  </div>{" "}
                </div>{" "}
                <div
                  style={{
                    marginTop: "1rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  {" "}
                  <input
                    type="checkbox"
                    {...register("is_panel_member")}
                    id="panel"
                  />{" "}
                  <label
                    htmlFor="panel"
                    style={{ fontSize: "13px", color: "#555" }}
                  >
                    I am a Best Dive Guide Professional Panel member
                  </label>{" "}
                </div>{" "}
              </>
            )}{" "}
            {/* STEP 2: Visit Details */}{" "}
            {step === "visit" && (
              <>
                {" "}
                <h2
                  style={{
                    fontSize: "22px",
                    color: "#0A2342",
                    marginBottom: "0.5rem",
                  }}
                >
                  Your visit
                </h2>{" "}
                <p
                  style={{
                    color: "#666",
                    fontSize: "14px",
                    marginBottom: "2rem",
                  }}
                >
                  Tell us about the place you are voting for.
                </p>{" "}
                <div style={{ marginBottom: "1rem" }}>
                  {" "}
                  <label
                    style={{
                      display: "block",
                      fontSize: "13px",
                      fontWeight: "600",
                      color: "#333",
                      marginBottom: "5px",
                    }}
                  >
                    Name of the place *
                  </label>{" "}
                  <input
                    {...register("place_name", { required: true })}
                    style={{
                      width: "100%",
                      padding: "10px 12px",
                      border: "1px solid #ddd",
                      borderRadius: "6px",
                      fontSize: "14px",
                    }}
                  />{" "}
                </div>{" "}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "1rem",
                    marginBottom: "1rem",
                  }}
                >
                  {" "}
                  <div>
                    {" "}
                    <label
                      style={{
                        display: "block",
                        fontSize: "13px",
                        fontWeight: "600",
                        color: "#333",
                        marginBottom: "5px",
                      }}
                    >
                      Country *
                    </label>{" "}
                    <input
                      {...register("place_country", { required: true })}
                      style={{
                        width: "100%",
                        padding: "10px 12px",
                        border: "1px solid #ddd",
                        borderRadius: "6px",
                        fontSize: "14px",
                      }}
                    />{" "}
                  </div>{" "}
                  <div>
                    {" "}
                    <label
                      style={{
                        display: "block",
                        fontSize: "13px",
                        fontWeight: "600",
                        color: "#333",
                        marginBottom: "5px",
                      }}
                    >
                      Date of visit *
                    </label>{" "}
                    <input
                      type="date"
                      {...register("visit_date", { required: true })}
                      style={{
                        width: "100%",
                        padding: "10px 12px",
                        border: "1px solid #ddd",
                        borderRadius: "6px",
                        fontSize: "14px",
                      }}
                    />{" "}
                  </div>{" "}
                </div>{" "}
                <div
                  style={{
                    background: "#F5F0E8",
                    borderRadius: "10px",
                    padding: "1.25rem",
                    marginBottom: "1.5rem",
                  }}
                >
                  {" "}
                  <p
                    style={{
                      fontSize: "13px",
                      fontWeight: "600",
                      color: "#0A2342",
                      marginBottom: "12px",
                    }}
                  >
                    What did you experience? Select all that apply.
                  </p>{" "}
                  <div
                    style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}
                  >
                    {" "}
                    {[
                      { key: "voted_dive", label: " Diving" },
                      { key: "voted_food", label: " Food" },
                      { key: "voted_stay", label: " Accommodation" },
                      { key: "voted_liveaboard", label: " Liveaboard" },
                    ].map(({ key, label }) => (
                      <label
                        key={key}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                          cursor: "pointer",
                          fontSize: "14px",
                        }}
                      >
                        {" "}
                        <input
                          type="checkbox"
                          {...register(key)}
                          style={{ accentColor: "#1B6CA8" }}
                        />{" "}
                        {label}{" "}
                      </label>
                    ))}{" "}
                  </div>{" "}
                </div>{" "}
                <div>
                  {" "}
                  <label
                    style={{
                      display: "block",
                      fontSize: "13px",
                      fontWeight: "600",
                      color: "#333",
                      marginBottom: "5px",
                    }}
                  >
                    {" "}
                    Proof of visit *{" "}
                    <span style={{ fontWeight: "400", color: "#888" }}>
                      (booking confirmation URL, photo, or dive log)
                    </span>{" "}
                  </label>{" "}
                  <input
                    {...register("proof_url", { required: true })}
                    placeholder="https:// or describe your proof"
                    style={{
                      width: "100%",
                      padding: "10px 12px",
                      border: "1px solid #ddd",
                      borderRadius: "6px",
                      fontSize: "14px",
                    }}
                  />{" "}
                </div>{" "}
              </>
            )}{" "}
            {/* STEP 3: Scores */}{" "}
            {step === "scores" && (
              <>
                {" "}
                <h2
                  style={{
                    fontSize: "22px",
                    color: "#0A2342",
                    marginBottom: "0.5rem",
                  }}
                >
                  Rate your experience
                </h2>{" "}
                <p
                  style={{
                    color: "#666",
                    fontSize: "14px",
                    marginBottom: "2rem",
                  }}
                >
                  Score each question from 1 (poor) to 10 (exceptional). Only
                  rate what you experienced.
                </p>{" "}
                {votedDive && (
                  <div style={{ marginBottom: "2rem" }}>
                    {" "}
                    <h3
                      style={{
                        fontSize: "15px",
                        color: "#0097A7",
                        fontWeight: "700",
                        marginBottom: "1rem",
                        paddingBottom: "8px",
                        borderBottom: "2px solid #E1F5F8",
                      }}
                    >
                      {" "}
                      Dive Experience
                    </h3>{" "}
                    <ScoreField
                      label="Marine life — diversity, abundance, reef health"
                      name="dive_marine_life"
                      register={register}
                    />{" "}
                    <ScoreField
                      label="Uniqueness of this dive site or operation"
                      name="dive_uniqueness"
                      register={register}
                    />{" "}
                    <ScoreField
                      label="Visibility and conditions during your visit"
                      name="dive_conditions"
                      register={register}
                    />{" "}
                    <ScoreField
                      label="Professionalism and knowledge of the dive operation"
                      name="dive_operation"
                      register={register}
                    />{" "}
                    <ScoreField
                      label="How safe the dive experience felt"
                      name="dive_safety"
                      register={register}
                    />{" "}
                    <ScoreField
                      label="Overall memorability of the dive"
                      name="dive_memorable"
                      register={register}
                    />{" "}
                    <ScoreField
                      label="Would you travel back specifically for this dive?"
                      name="dive_would_return"
                      register={register}
                    />{" "}
                  </div>
                )}{" "}
                {votedFood && (
                  <div style={{ marginBottom: "2rem" }}>
                    {" "}
                    <h3
                      style={{
                        fontSize: "15px",
                        color: "#E8723A",
                        fontWeight: "700",
                        marginBottom: "1rem",
                        paddingBottom: "8px",
                        borderBottom: "2px solid #FEF0E8",
                      }}
                    >
                      {" "}
                      Food & Dining
                    </h3>{" "}
                    <ScoreField
                      label="Overall quality of the food"
                      name="food_quality"
                      register={register}
                    />{" "}
                    <ScoreField
                      label="Freshness and quality of ingredients"
                      name="food_freshness"
                      register={register}
                    />{" "}
                    <ScoreField
                      label="How well food was adapted to divers' needs"
                      name="food_diver_adapted"
                      register={register}
                    />{" "}
                    <ScoreField
                      label="Memorability of the dining experience"
                      name="food_memorable"
                      register={register}
                    />{" "}
                    <ScoreField
                      label="Variety and creativity of the menu"
                      name="food_variety"
                      register={register}
                    />{" "}
                    <ScoreField
                      label="Full food offering — breakfast, lunch, dinner"
                      name="food_full_offering"
                      register={register}
                    />{" "}
                    <ScoreField
                      label="Would you recommend this to another foodie diver?"
                      name="food_recommend"
                      register={register}
                    />{" "}
                  </div>
                )}{" "}
                {votedStay && (
                  <div style={{ marginBottom: "2rem" }}>
                    {" "}
                    <h3
                      style={{
                        fontSize: "15px",
                        color: "#1B6CA8",
                        fontWeight: "700",
                        marginBottom: "1rem",
                        paddingBottom: "8px",
                        borderBottom: "2px solid #E8EFF8",
                      }}
                    >
                      {" "}
                      Accommodation & Stay
                    </h3>{" "}
                    <ScoreField
                      label="Comfort and quality of accommodation"
                      name="stay_comfort"
                      register={register}
                    />{" "}
                    <ScoreField
                      label="Service and hospitality"
                      name="stay_service"
                      register={register}
                    />{" "}
                    <ScoreField
                      label="How well the stay understood divers' needs"
                      name="stay_diver_friendly"
                      register={register}
                    />{" "}
                    <ScoreField
                      label="Diver facilities — gear drying, storage, rinse tanks"
                      name="stay_facilities"
                      register={register}
                    />{" "}
                    <ScoreField
                      label="Location and overall atmosphere"
                      name="stay_atmosphere"
                      register={register}
                    />{" "}
                    <ScoreField
                      label="Would you return to this place?"
                      name="stay_would_return"
                      register={register}
                    />{" "}
                    <ScoreField
                      label="Would you recommend to another serious diver?"
                      name="stay_recommend"
                      register={register}
                    />{" "}
                  </div>
                )}{" "}
                <div style={{ marginTop: "1.5rem" }}>
                  {" "}
                  <h3
                    style={{
                      fontSize: "15px",
                      color: "#333",
                      fontWeight: "700",
                      marginBottom: "1rem",
                    }}
                  >
                    Open Feedback
                  </h3>{" "}
                  {[
                    {
                      name: "feedback_special",
                      label: "What made this experience special?",
                    },
                    {
                      name: "feedback_improve",
                      label: "What could be improved?",
                    },
                    {
                      name: "feedback_best_for",
                      label: "Who is this place best for?",
                    },
                    { name: "feedback_tips", label: "Tips for future guests?" },
                  ].map((f) => (
                    <div key={f.name} style={{ marginBottom: "1rem" }}>
                      {" "}
                      <label
                        style={{
                          display: "block",
                          fontSize: "13px",
                          fontWeight: "600",
                          color: "#333",
                          marginBottom: "5px",
                        }}
                      >
                        {f.label}
                      </label>{" "}
                      <textarea
                        {...register(f.name)}
                        rows={2}
                        style={{
                          width: "100%",
                          padding: "10px 12px",
                          border: "1px solid #ddd",
                          borderRadius: "6px",
                          fontSize: "14px",
                          resize: "vertical",
                        }}
                      />{" "}
                    </div>
                  ))}{" "}
                </div>{" "}
              </>
            )}{" "}
            {/* STEP 4: Sustainability */}{" "}
            {step === "sustainability" && (
              <>
                {" "}
                <h2
                  style={{
                    fontSize: "22px",
                    color: "#0A2342",
                    marginBottom: "0.5rem",
                  }}
                >
                  Sustainability rating
                </h2>{" "}
                <p
                  style={{
                    color: "#666",
                    fontSize: "14px",
                    marginBottom: "0.5rem",
                  }}
                >
                  Divers see the ocean up close. Rate the sustainability
                  practices of the places you visit. High scorers earn the Green
                  Diver Approved badge.
                </p>{" "}
                <div
                  style={{
                    background: "#E8F5E9",
                    borderRadius: "8px",
                    padding: "10px 14px",
                    marginBottom: "2rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  {" "}
                  <span style={{ fontSize: "18px" }}></span>{" "}
                  <span
                    style={{
                      fontSize: "13px",
                      color: "#2E7D32",
                      fontWeight: "600",
                    }}
                  >
                    Score 8.0+ across relevant questions to earn the Green Diver
                    Approved badge
                  </span>{" "}
                </div>{" "}
                {votedStay && (
                  <div style={{ marginBottom: "2rem" }}>
                    {" "}
                    <h3
                      style={{
                        fontSize: "15px",
                        color: "#2E7D32",
                        fontWeight: "700",
                        marginBottom: "1rem",
                      }}
                    >
                      Accommodation sustainability
                    </h3>{" "}
                    <ScoreField
                      label="Clear and visible environmental policies?"
                      name="sus_stay_env_policy"
                      register={register}
                    />{" "}
                    <ScoreField
                      label="Active reduction of single-use plastics?"
                      name="sus_stay_plastic"
                      register={register}
                    />{" "}
                    <ScoreField
                      label="Support for local marine conservation?"
                      name="sus_stay_conservation"
                      register={register}
                    />{" "}
                    <ScoreField
                      label="Locally and seasonally sourced food?"
                      name="sus_stay_local_food"
                      register={register}
                    />{" "}
                    <ScoreField
                      label="Responsible water and energy use?"
                      name="sus_stay_energy"
                      register={register}
                    />{" "}
                  </div>
                )}{" "}
                {votedFood && (
                  <div style={{ marginBottom: "2rem" }}>
                    {" "}
                    <h3
                      style={{
                        fontSize: "15px",
                        color: "#2E7D32",
                        fontWeight: "700",
                        marginBottom: "1rem",
                      }}
                    >
                      Food sustainability
                    </h3>{" "}
                    <ScoreField
                      label="Ingredients locally and seasonally sourced?"
                      name="sus_food_local"
                      register={register}
                    />{" "}
                    <ScoreField
                      label="Active reduction of food waste?"
                      name="sus_food_waste"
                      register={register}
                    />{" "}
                    <ScoreField
                      label="Ethically sourced seafood — no endangered species?"
                      name="sus_food_seafood"
                      register={register}
                    />{" "}
                    <ScoreField
                      label="No single-use plastic in dining?"
                      name="sus_food_plastic"
                      register={register}
                    />{" "}
                    <ScoreField
                      label="Supports local farmers, fishers, and suppliers?"
                      name="sus_food_community"
                      register={register}
                    />{" "}
                  </div>
                )}{" "}
                {votedDive && (
                  <div style={{ marginBottom: "2rem" }}>
                    {" "}
                    <h3
                      style={{
                        fontSize: "15px",
                        color: "#2E7D32",
                        fontWeight: "700",
                        marginBottom: "1rem",
                      }}
                    >
                      Dive operation sustainability
                    </h3>{" "}
                    <ScoreField
                      label="Guests briefed on reef protection?"
                      name="sus_dive_brief"
                      register={register}
                    />{" "}
                    <ScoreField
                      label="Clear no-touch, no-take, no-feed policy enforced?"
                      name="sus_dive_no_touch"
                      register={register}
                    />{" "}
                    <ScoreField
                      label="Uses mooring buoys — no anchoring on reef?"
                      name="sus_dive_mooring"
                      register={register}
                    />{" "}
                    <ScoreField
                      label="Contributes to marine conservation?"
                      name="sus_dive_conservation"
                      register={register}
                    />{" "}
                    <ScoreField
                      label="Part of or supports a marine protected area?"
                      name="sus_dive_mpa"
                      register={register}
                    />{" "}
                  </div>
                )}{" "}
              </>
            )}{" "}
            {/* STEP 5: Confirm */}{" "}
            {step === "confirm" && (
              <>
                {" "}
                <h2
                  style={{
                    fontSize: "22px",
                    color: "#0A2342",
                    marginBottom: "1rem",
                  }}
                >
                  Ready to submit
                </h2>{" "}
                <div
                  style={{
                    background: "#F5F0E8",
                    borderRadius: "10px",
                    padding: "1.25rem",
                    marginBottom: "1.5rem",
                  }}
                >
                  {" "}
                  <p
                    style={{
                      fontSize: "14px",
                      color: "#444",
                      lineHeight: "1.7",
                    }}
                  >
                    {" "}
                    By submitting, you confirm that you have actually visited
                    this place within the allowed time period, and that your
                    review reflects your genuine experience. Fake or misleading
                    votes will be removed.{" "}
                  </p>{" "}
                </div>{" "}
                {error && (
                  <div
                    style={{
                      background: "#FFEBEE",
                      border: "1px solid #FFCDD2",
                      borderRadius: "8px",
                      padding: "12px",
                      marginBottom: "1rem",
                      color: "#C62828",
                      fontSize: "14px",
                    }}
                  >
                    {" "}
                    {error}{" "}
                  </div>
                )}{" "}
                <label
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "8px",
                    cursor: "pointer",
                    marginBottom: "1.5rem",
                  }}
                >
                  {" "}
                  <input
                    type="checkbox"
                    {...register("confirmed", { required: true })}
                    style={{ marginTop: "2px" }}
                  />{" "}
                  <span style={{ fontSize: "14px", color: "#444" }}>
                    I confirm this is my genuine experience and I have proof of
                    visit.
                  </span>{" "}
                </label>{" "}
              </>
            )}{" "}
            {/* Navigation */}{" "}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "2rem",
                paddingTop: "1.5rem",
                borderTop: "1px solid #eee",
              }}
            >
              {" "}
              {stepIndex > 0 ? (
                <button
                  type="button"
                  onClick={back}
                  style={{
                    background: "transparent",
                    border: "1px solid #ddd",
                    padding: "10px 20px",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontSize: "14px",
                    color: "#555",
                  }}
                >
                  {" "}
                  Back{" "}
                </button>
              ) : (
                <div />
              )}{" "}
              {step !== "confirm" ? (
                <button
                  type="button"
                  onClick={next}
                  style={{
                    background: "#0A2342",
                    color: "white",
                    border: "none",
                    padding: "12px 28px",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontSize: "14px",
                    fontWeight: "600",
                  }}
                >
                  {" "}
                  Continue{" "}
                </button>
              ) : (
                <button
                  type="submit"
                  style={{
                    background: "#E8723A",
                    color: "white",
                    border: "none",
                    padding: "12px 28px",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontSize: "14px",
                    fontWeight: "600",
                  }}
                >
                  {" "}
                  Submit Vote{" "}
                </button>
              )}{" "}
            </div>{" "}
          </form>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
}
