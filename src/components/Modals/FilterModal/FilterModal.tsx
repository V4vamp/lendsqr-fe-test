"use client";

import styles from "./filter.module.scss";

interface UserFilters {
  organisation: string;
  fullName: string;
  email: string;
  phone: string;
  status: string;
  dateJoined: string;
}

interface FilterModalProps {
  filters: UserFilters;
  organisations: string[];
  onChange: (key: keyof UserFilters, value: string) => void;
  onReset: () => void;
  onApply: () => void;
}

const FilterModal = ({
  filters,
  onChange,
  onReset,
  onApply,
  organisations,
}: FilterModalProps) => {
  return (
    <div className={styles.filter}>
      <div className={styles.field}>
        <label>Organization</label>
        <select
        className={styles.select}
          value={filters.organisation}
          onChange={(e) => onChange("organisation", e.target.value)}
        >
          <option value="" disabled selected>Select</option>

          {organisations.map((org) => (
            <option key={org} value={org}>
              {org}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.field}>
        <label>Username</label>
        <input
          type="text"
          placeholder="Username"
          value={filters.fullName}
          onChange={(e) => onChange("fullName", e.target.value)}
        />
      </div>

      <div className={styles.field}>
        <label>Email</label>
        <input
          type="email"
          placeholder="Email"
          value={filters.email}
          onChange={(e) => onChange("email", e.target.value)}
        />
      </div>

      <div className={styles.field}>
        <label>Date</label>
        <input
          type="date"
          value={filters.dateJoined}
          onChange={(e) => onChange("dateJoined", e.target.value)}
        />
      </div>

      <div className={styles.field}>
        <label>Phone Number</label>
        <input
          type="text"
          placeholder="Phone Number"
          value={filters.phone}
          onChange={(e) => onChange("phone", e.target.value)}
        />
      </div>

      <div className={styles.field}>
        <label>Status</label>
        <select
          value={filters.status}
          onChange={(e) => onChange("status", e.target.value)}
        >
          <option value="">Select</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
          <option value="Blacklisted">Blacklisted</option>
        </select>
      </div>

      <div className={styles.actions}>
        <button className={styles.reset} onClick={onReset}>
          Reset
        </button>
        <button className={styles.filterButton} onClick={onApply}>
          Filter
        </button>
      </div>
    </div>
  );
};

export default FilterModal;
