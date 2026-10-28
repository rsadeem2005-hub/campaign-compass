import { useState } from "react";
import "./styles.css";

const initialCampaigns = [
  {
    id: 1,
    name: "Spring Product Launch",
    goal: "Product awareness",
    channel: "Email",
    status: "Active",
    audience: "Existing customers",
    date: "Apr 18, 2026",
  },
  {
    id: 2,
    name: "Weekend Social Campaign",
    goal: "Engagement",
    channel: "Social Media",
    status: "Draft",
    audience: "Young adults",
    date: "Apr 22, 2026",
  },
  {
    id: 3,
    name: "Re-engagement Campaign",
    goal: "Customer retention",
    channel: "Email",
    status: "Completed",
    audience: "Inactive customers",
    date: "Apr 10, 2026",
  },
];

function App() {
  const [campaigns, setCampaigns] = useState(initialCampaigns);
  const [filter, setFilter] = useState("All");

  const filteredCampaigns =
    filter === "All"
      ? campaigns
      : campaigns.filter((campaign) => campaign.status === filter);

  const addCampaign = () => {
    const newCampaign = {
      id: Date.now(),
      name: `New Campaign ${campaigns.length + 1}`,
      goal: "Brand awareness",
      channel: "Email",
      status: "Draft",
      audience: "Target audience",
      date: "Not scheduled",
    };

    setCampaigns((current) => [newCampaign, ...current]);
  };

  const updateStatus = (id, status) => {
    setCampaigns((current) =>
      current.map((campaign) =>
        campaign.id === id ? { ...campaign, status } : campaign
      )
    );
  };

  return (
    <div className="app">
      <header className="topbar">
        <div>
          <span className="eyebrow">MARKETING WORKSPACE</span>
          <h1>Campaign Compass</h1>
          <p>Plan, organize and track marketing campaigns.</p>
        </div>

        <button className="primary-button" onClick={addCampaign}>
          + New Campaign
        </button>
      </header>

      <main>
        <section className="overview">
          <div className="stat-card">
            <span>Total Campaigns</span>
            <strong>{campaigns.length}</strong>
          </div>

          <div className="stat-card">
            <span>Active</span>
            <strong>
              {campaigns.filter((c) => c.status === "Active").length}
            </strong>
          </div>

          <div className="stat-card">
            <span>Drafts</span>
            <strong>
              {campaigns.filter((c) => c.status === "Draft").length}
            </strong>
          </div>

          <div className="stat-card">
            <span>Completed</span>
            <strong>
              {campaigns.filter((c) => c.status === "Completed").length}
            </strong>
          </div>
        </section>

        <section className="campaign-section">
          <div className="section-heading">
            <div>
              <span className="eyebrow">CAMPAIGN PLANNER</span>
              <h2>Your campaigns</h2>
            </div>

            <div className="filters">
              {["All", "Active", "Draft", "Completed"].map((status) => (
                <button
                  key={status}
                  className={filter === status ? "active" : ""}
                  onClick={() => setFilter(status)}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          <div className="campaign-list">
            {filteredCampaigns.map((campaign) => (
              <article className="campaign-card" key={campaign.id}>
                <div className="campaign-info">
                  <span className="campaign-date">{campaign.date}</span>

                  <h3>{campaign.name}</h3>

                  <p>{campaign.goal}</p>

                  <div className="campaign-details">
                    <span>{campaign.channel}</span>
                    <span>{campaign.audience}</span>
                  </div>
                </div>

                <div className="campaign-actions">
                  <span
                    className={`status ${campaign.status.toLowerCase()}`}
                  >
                    {campaign.status}
                  </span>

                  <select
                    value={campaign.status}
                    onChange={(event) =>
                      updateStatus(campaign.id, event.target.value)
                    }
                  >
                    <option>Draft</option>
                    <option>Active</option>
                    <option>Completed</option>
                  </select>
                </div>
              </article>
            ))}

            {filteredCampaigns.length === 0 && (
              <div className="empty-state">
                <h3>No campaigns found</h3>
                <p>Try another status filter or create a new campaign.</p>
              </div>
            )}
          </div>
        </section>

        <section className="strategy">
          <div>
            <span className="eyebrow">CAMPAIGN FRAMEWORK</span>
            <h2>Keep every campaign moving in the right direction.</h2>
          </div>

          <div className="framework">
            <div>
              <span>01</span>
              <h3>Define</h3>
              <p>Set a clear objective and identify the audience.</p>
            </div>

            <div>
              <span>02</span>
              <h3>Plan</h3>
              <p>Choose channels, messaging and campaign timing.</p>
            </div>

            <div>
              <span>03</span>
              <h3>Launch</h3>
              <p>Activate the campaign and monitor its progress.</p>
            </div>

            <div>
              <span>04</span>
              <h3>Improve</h3>
              <p>Review performance and refine the next campaign.</p>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <span>Campaign Compass</span>
        <span>Built by Ruqaiya Sadeem</span>
      </footer>
    </div>
  );
}

export default App;
