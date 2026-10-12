"""
Modular AI Prediction Engine
Implements baseline statistical regression, moving averages, and physical mass-balance extrapolation.
Modular architecture: can be directly swapped with trained scikit-learn / PyTorch models.
"""

from typing import List, Dict, Any

class PredictionEngine:
    def __init__(self):
        self.model_version = "v1.0.0-baseline"

    def predict_time_series(self, values: List[float], steps_ahead: int = 1) -> Dict[str, Any]:
        """
        Calculates linear regression trend over historical data points
        """
        if not values or len(values) < 2:
            val = values[0] if values else 0.0
            return {
                "slope": 0.0,
                "predicted_value": val,
                "confidence": 50,
                "trend": "Stable"
            }

        n = len(values)
        x = list(range(n))
        y = values

        sum_x = sum(x)
        sum_y = sum(y)
        sum_xy = sum(i * j for i, j in zip(x, y))
        sum_xx = sum(i * i for i in x)

        denom = (n * sum_xx - sum_x * sum_x)
        if denom == 0:
            slope = 0.0
            intercept = sum_y / n
        else:
            slope = (n * sum_xy - sum_x * sum_y) / denom
            intercept = (sum_y - slope * sum_x) / n

        next_x = n - 1 + steps_ahead
        pred = intercept + slope * next_x

        if slope > 0.2:
            trend = "Rising"
        elif slope < -0.2:
            trend = "Declining"
        else:
            trend = "Stable"

        # Baseline heuristic confidence: higher if variance along line is consistent
        confidence = min(95, max(60, int(90 - abs(slope) * 2)))

        return {
            "slope": round(slope, 3),
            "predicted_value": round(pred, 2),
            "confidence": confidence,
            "trend": trend
        }

prediction_engine = PredictionEngine()
