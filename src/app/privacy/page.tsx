import NavBar from "../../components/UI/NavBar";

export default function Page() {
    return (
        <div className="max-w-5xl w-11/12 mx-auto mt-10">
            <div className="flex">
                {/* <NavBar/> */}
                <div className="flex flex-1 flex-col text-gray-200">
                    <h1 className="text-center font-semibold text-2xl tracking-wider mb-6">Privacy Policy</h1>

                    <div className="rounded-lg shadow-lg text-justify">
                        <p className="mb-4">Your privacy is important to us. This Privacy Policy explains how we collect, use, disclose, and safeguard your personal data when you use our web application. By using our application, you consent to the practices described in this policy.</p>

                        <h2 className="text-xl font-semibold mb-2">1. Information We Collect</h2>
                        <p className="mb-4">We collect the following types of information:</p>

                        <ul className="list-disc pl-6 mb-4">
                            <li>Spotify Data: When you log in with your Spotify account, we obtain access to the following permissions: 'user-top-read,' 'streaming,' 'user-read-email,' 'user-read-private,' 'playlist-modify-public,' 'playlist-modify-private,' and 'user-read-recently-played.' We use this data to provide personalized music recommendations, such as your top tracks and artists, favorite genres, and recently played songs.</li>
                            <li>Google Analytics Data: We collect data on user behavior and interactions within our application using Google Analytics. This helps us improve the user experience and identify areas for enhancement.</li>
                            <li>Amplify Data: Amplify is used to gather certain user information for better interaction and functionality within our application.</li>
                        </ul>

                        <h2 className="text-xl font-semibold mb-2">2. How We Use Your Information</h2>
                        <p className="mb-4">We use the collected data for the following purposes:</p>

                        <ul className="list-disc pl-6 mb-4">
                            <li>To provide you with personalized music recommendations and insights based on your Spotify usage.</li>
                            <li>To analyze and improve our application's performance, features, and user experience.</li>
                            <li>To communicate with you about updates, new features, and promotions related to our application.</li>
                        </ul>

                        <h2 className="text-xl font-semibold mb-2">3. Data Security</h2>
                        <p className="mb-4">We take data security seriously and have implemented measures to protect your information. However, please be aware that no method of transmission over the internet or electronic storage is completely secure, and we cannot guarantee the absolute security of your data.</p>

                        <h2 className="text-xl font-semibold mb-2">4. Data Sharing</h2>
                        <p className="mb-4">We do not sell, trade, or otherwise transfer your personal data to third parties without your consent, except for trusted third parties who assist us in operating our application. These third parties are required to keep your data confidential.</p>

                        {/* <h2 className="text-xl font-semibold mb-2">5. Your Choices</h2>
                        <p className="mb-4">You have the right to:</p> */}

                        {/* <ul className="list-disc pl-6 mb-4">
                            <li>Access, modify, or delete your personal data.</li>
                            <li>Opt-out of marketing communications.</li>
                            <li>Request information about the data we hold about you.</li>
                        </ul> */}

                        <h2 className="text-xl font-semibold mb-2">5. Changes to This Policy</h2>
                        <p className="mb-4">We may update our Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any changes by posting the new Privacy Policy on this page.</p>

                        <h2 className="text-xl font-semibold mb-2">6. Contact Us</h2>
                        <p className="mb-4">If you have any questions or concerns about this Privacy Policy, please contact us at.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
