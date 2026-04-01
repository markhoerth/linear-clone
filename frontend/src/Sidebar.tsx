interface SidebarProps {
  onCreateClick: () => void;
}

export default function Sidebar({ onCreateClick }: SidebarProps) {
  return (
    <nav className="sidebar">
      <div className="sidebar-header">
        <div className="workspace-icon">MC</div>
        <span className="workspace-name">MCPworkshop</span>
      </div>

      <div className="sidebar-nav">
        <div className="nav-item">
          <svg className="nav-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <rect x="2" y="3" width="12" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M2 6h12" stroke="currentColor" strokeWidth="1.5"/>
          </svg>
          Inbox
        </div>
        <div className="nav-item">
          <svg className="nav-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="1.5"/>
          </svg>
          My issues
        </div>
      </div>

      <div className="section-header">Workspace ▾</div>
      <div className="sidebar-nav">
        <div className="nav-item">Projects</div>
        <div className="nav-item">Views</div>
        <div className="nav-item">More</div>
      </div>

      <div className="divider" />

      <div className="section-header">Your teams ▾</div>
      <div className="team-section">
        <div className="team-header">
          <div className="team-icon">M</div>
          MCPworkshop ▾
        </div>
        <div className="sub-nav">
          <div className="nav-item active">Issues</div>
          <div className="nav-item">Projects</div>
          <div className="nav-item">Views</div>
        </div>
      </div>

      <div className="divider" />

      <div className="section-header">Try ▾</div>
      <div className="sidebar-nav">
        <div className="nav-item">Import issues</div>
        <div className="nav-item" onClick={onCreateClick} style={{ cursor: "pointer" }}>
          + Create issue
        </div>
      </div>
    </nav>
  );
}
