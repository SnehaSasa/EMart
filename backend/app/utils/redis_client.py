import redis
import json

print("REDIS************* service loaded")

redis_client = redis.Redis.from_url(
    "rediss://default:gQAAAAAAARqxAAIncDFlYTQzODk0OTA1YWY0NjgwYTQ1MTNiMmUwMmRiMjkyNHAxNzIzNjk@crack-zebra-72369.upstash.io:6379",
    decode_responses=True
)
print("Redis ping:", redis_client.ping())

def get_cache(key):
    try:
        data = redis_client.get(key)
        print("Redis GET raw:", data)
        if data:
            return json.loads(data)
    except Exception as e:
        print("Redis GET error:", e)
    return None

def set_cache(key, value, expiry=3600):
    try:
        redis_client.set(key, json.dumps(value), ex=expiry)
        print("Stored in Redis:", key)
    except Exception as e:
        print("Redis SET error:", e)
def delete_cache(key):
    try:
        redis_client.delete(key)
    except Exception as e:
        print("Redis DELETE error:", e)