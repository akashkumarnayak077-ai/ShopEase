
const API_URL = "http://localhost:8080/api/visitors";

// Fetch visitor records from Spring Boot
async function loadVisitors() {
    const tableBody = document.getElementById("visitorTableBody");

    tableBody.innerHTML = `
        <tr>
            <td colspan="4">Loading visitors...</td>
        </tr>
    `;

    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Unable to fetch visitor data");
        }

        const visitors = await response.json();

        // Update statistics
        document.getElementById("totalVisitors").textContent =
            visitors.length;

        const countries = new Set(
            visitors.map(visitor => visitor.country)
        );

        document.getElementById("uniqueCountries").textContent =
            countries.size;

        const simulatedCount = visitors.filter(
            visitor => visitor.simulated
        ).length;

        document.getElementById("simulatedVisitors").textContent =
            simulatedCount;

        // Display visitor records
        if (visitors.length === 0) {
            tableBody.innerHTML = `
                <tr>
                    <td colspan="4">No visitor records found.</td>
                </tr>
            `;
            return;
        }

        tableBody.innerHTML = "";

        visitors.forEach(visitor => {
            const row = document.createElement("tr");

            const visitTime = new Date(
                visitor.visitedAt
            ).toLocaleString();

            row.innerHTML = `
                <td>${visitor.ipAddress}</td>
                <td>${visitor.country || "Unknown"}</td>
                <td>${visitTime}</td>
                <td>
                    <span class="visitor-type">
                        ${visitor.simulated ? "Simulated" : "Real"}
                    </span>
                </td>
            `;

            tableBody.appendChild(row);
        });

    } catch (error) {
        console.error("Error:", error);

        tableBody.innerHTML = `
            <tr>
                <td colspan="4">
                    Failed to load visitors. Check whether the backend is running.
                </td>
            </tr>
        `;
    }
}

// Refresh button
document.getElementById("refreshVisitorsBtn")
    .addEventListener("click", loadVisitors);

// Load data when the page opens
loadVisitors();
