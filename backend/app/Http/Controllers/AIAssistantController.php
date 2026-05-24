<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class AIAssistantController extends Controller
{
    public function chat(Request $request)
    {
        $request->validate([
            'message' => 'required|string|max:500',
            'context' => 'nullable|array'
        ]);

        $userMessage = $request->input('message');
        $contextData = $request->input('context', []);
        
        $user = $request->user();

        // Construct System Prompt
        $systemPrompt = "You are an expert AI Eco-Driving Assistant named 'EcoBot'. Your goal is to help drivers reduce fuel consumption, save money, and lower carbon emissions by analyzing their telemetry data. Be concise, encouraging, and highly technical when appropriate. Format your response in clean markdown.";

        // Construct Context String
        $contextString = "User Name: " . ($user ? $user->name : 'Driver') . "\n";
        $contextString .= "Total Trips Logged: " . ($contextData['totalTrips'] ?? 'N/A') . "\n";
        $contextString .= "Average Eco Score: " . ($contextData['avgEcoScore'] ?? 'N/A') . " / 100\n";
        $contextString .= "Recent Hard Brakes: " . ($contextData['totalBrakes'] ?? 'N/A') . "\n";
        $contextString .= "Recent Hard Accels: " . ($contextData['totalAccels'] ?? 'N/A') . "\n";

        $fullPrompt = "CONTEXT:\n" . $contextString . "\n\nUSER QUESTION: " . $userMessage;

        /* 
        // ==========================================
        // REAL API CALL IMPLEMENTATION (COMMENTED OUT)
        // ==========================================
        // To use this, add OPENROUTER_API_KEY=your_key to .env
        
        try {
            $response = Http::withHeaders([
                'Authorization' => 'Bearer ' . env('OPENROUTER_API_KEY'),
                'Content-Type' => 'application/json',
            ])->post('https://openrouter.ai/api/v1/chat/completions', [
                'model' => 'google/gemini-pro', // or 'openai/gpt-4o-mini'
                'messages' => [
                    ['role' => 'system', 'content' => $systemPrompt],
                    ['role' => 'user', 'content' => $fullPrompt]
                ],
            ]);

            if ($response->successful()) {
                $reply = $response->json('choices.0.message.content');
                return response()->json(['reply' => $reply]);
            }
        } catch (\Exception $e) {
            Log::error("AI API Error: " . $e->getMessage());
        }
        */

        // ==========================================
        // MOCKED RESPONSE FOR DEMONSTRATION
        // ==========================================
        
        // Add a slight delay to simulate AI thinking
        usleep(1500000); // 1.5 seconds

        $mockReply = $this->generateMockResponse($userMessage, $contextData);

        return response()->json([
            'reply' => $mockReply
        ]);
    }

    private function generateMockResponse($message, $context)
    {
        $messageLower = strtolower($message);
        
        if (str_contains($messageLower, 'what is the app doing') || str_contains($messageLower, 'what does the app do') || str_contains($messageLower, 'about the app')) {
            return "EcoDrive is a platform designed to help you drive more sustainably! It tracks your vehicle data, logs your trips, and calculates your carbon emissions. By analyzing your driving habits—like hard braking or rapid acceleration—it provides personalized recommendations to help you reduce fuel consumption, save money, and lower your environmental impact.";
        }

        if (str_contains($messageLower, 'reduce emission') || str_contains($messageLower, 'lower emission')) {
            return "To reduce your carbon emissions, try these highly effective tips:\n\n* **Maintain a steady speed:** Use cruise control on the highway when safe.\n* **Anticipate traffic:** Avoid unnecessary hard braking and rapid acceleration.\n* **Limit idling:** Turn off your engine if you are parked for more than a minute.\n* **Check tire pressure:** Under-inflated tires increase drag and lower fuel efficiency.\n* **Remove excess weight:** Don't carry unnecessary heavy items in your trunk.";
        }
        
        if (str_contains($messageLower, 'braking') || str_contains($messageLower, 'brake')) {
            return "I noticed you've had **" . ($context['totalBrakes'] ?? 0) . " hard braking events** recently.\n\n* **Tip:** Try scanning the road 12-15 seconds ahead. If you see a red light, take your foot off the gas early and coast. This converts kinetic energy efficiently rather than wasting it as friction heat on your brake pads!";
        }
        
        if (str_contains($messageLower, 'accelerat') || str_contains($messageLower, 'fast')) {
            return "You have **" . ($context['totalAccels'] ?? 0) . " rapid acceleration events** logged.\n\n* **Tip:** Imagine there is an egg under your gas pedal. Pressing it smoothly rather than stomping can improve your fuel economy by up to **15-20%** in city driving.";
        }
        
        if (str_contains($messageLower, 'score') || str_contains($messageLower, 'average')) {
            return "Your current Average Eco Score is **" . ($context['avgEcoScore'] ?? 0) . "/100** across " . ($context['totalTrips'] ?? 0) . " trips. \n\nTo push this into the 90+ range (Eco Master tier), focus on maintaining a constant speed on highways and minimizing idle time. You're doing great!";
        }

        return "That's a great question about driving efficiency!\n\nBased on your telemetry (Avg Score: **" . ($context['avgEcoScore'] ?? 'N/A') . "**), I suggest focusing on maintaining momentum. Every time you come to a complete stop, it takes a massive amount of energy to get the vehicle's mass moving again. \n\nIs there a specific part of your commute (highway or city) you want to optimize?";
    }
}
