// import axios from "axios"

let isSubscribed = false
let swRegistration = null

export const register = () => {
	if ("serviceWorker" in navigator) {
		window.addEventListener("load", () => {
			navigator.serviceWorker
				.register(`/service-worker.js`, {
					scope: "/",
				})
				.then((reg) => {
					console.log("Success: ", reg.scope)
					swRegistration = reg

					initializeUI()
				})
				.catch((err) => console.log("Failure: ", err))
		})
	}
}

const initializeUI = () => {
	swRegistration.pushManager.getSubscription().then((subscription) => {
		isSubscribed = subscription !== null

		if (isSubscribed) {
			// updateSubscriptionOnServer(user.id, subscription)
			console.log("User IS subscribed.")
		} else {
			console.log('subscribe user')
			// subscribeUser()
		}
	})
}

// const applicationServerPublicKey = "YOUR_VAPID_PUBLIC_KEY"

// const subscribeUser = async () => {
//Prompt user permission for notification
// Notification.requestPermission((status) => {
// 	console.log("Notification permission status:", status)
// })
//If the browser has a permission, process subscribing the user.
// 	if (Notification.permission === "granted") {
// 		const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey)
// 		swRegistration.pushManager
// 			.subscribe({
// 				userVisibleOnly: true,
// 				applicationServerKey: applicationServerKey,
// 			})
// 			.then((subscription) => {
// 				console.log("User is subscribed:", subscription)

// 				// updateSubscriptionOnServer(user.id, subscription)

// 				isSubscribed = true
// 			})
// 			.catch((err) => {
// 				if (Notification.permission === "denied") {
// 					console.warn("Permission for notifications was denied")
// 				} else {
// 					console.error("Failed to subscribe the user: ", err)
// 				}
// 			})
// 	}
// }

// async function updateSubscriptionOnServer(
// 	userId,
// 	subscription,
// 	unsubscribe = "No"
// ) {
// Here's where you would send the subscription to the application server/database
//if the action is subscribe. make POST request to the server with user's subscription data.
// try {
// 	if (unsubscribe) {
// await axios.post(`/api/subscribe/${userId}`, subscription)
//if the action is unsubscribe. make DELETE request to remove user's subscription from database.
// } else {
// await axios.delete(`/api/subscribe/${userId}`)
// 			console.log("User is not subscribed")
// 		}
// 	} catch (error) {
// 		console.log("Update Subscription failed", error)
// 	}
// }

// function unsubscribeUser() {
// 	let userSubsctiption
// 	swRegistration.pushManager
// 		.getSubscription()
// 		.then((subscription) => {
// 			if (subscription) {
// 				userSubsctiption = subscription
// 				return subscription.unsubscribe()
// 			}
// 		})
// 		.catch((err) => {
// 			console.log("Error unsubscribing", err)
// 		})
// 		.then(() => {
//If user already have subscriotion with the app, remove the data from the database.
// if (userSubsctiption) {
// updateSubscriptionOnServer(user.id, userSubsctiption, null)
// 	}
// 	console.log("User is unsubscribed")
// 	isSubscribed = false
// })
// }

//parsing the VAPID key to correct format.
// function urlB64ToUint8Array(base64String) {
// 	const padding = "=".repeat((4 - (base64String.length % 4)) % 4)
// 	const base64 = (base64String + padding).replace(/\-/g, "+").replace(/_/g, "/")

// 	const rawData = window.atob(base64)
// 	const outputArray = new Uint8Array(rawData.length)

// 	for (let i = 0; i < rawData.length; ++i) {
// 		outputArray[i] = rawData.charCodeAt(i)
// 	}
// 	return outputArray
// }
