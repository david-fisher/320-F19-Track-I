import tweepy

def post_twitter(text):
	CONSUMER_KEY = "DbmMj7dkqv0yKOexX7llAVHLJ"
	CONSUMER_SECRET = "NHamjT8JbKPjPhG1lOZOd4ykpAxssGEn25CeZSTFpagsPyNQVB"
	ACCESS_TOKEN = "1196178653203304448-BZiMZcSg1WvgfyjqMGDLiwEq0BYQmn"
	ACCESS_TOKEN_SECRET = "iNWyLVNiNKaFnux1YHhNZmBulTx2XL55rBwsyUqFrWGAP"

	# Authenticate to Twitter
	auth = tweepy.OAuthHandler(CONSUMER_KEY, CONSUMER_SECRET)
	auth.set_access_token(ACCESS_TOKEN, ACCESS_TOKEN_SECRET)

	# Create API object
	api = tweepy.API(auth)

	# Create a tweet
	api.update_status(text)
