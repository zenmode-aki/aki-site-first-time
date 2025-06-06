// Google Apps Script for iPhone Health Data Processing
// スプレッドシートIDを設定してください
const SPREADSHEET_ID = '1uEeLojI--tt0kphcP3B4ECmz7z4p5Mb1eM0Yangd42U';

function doPost(e) {
  try {
    // リクエストデータを取得
    const requestData = JSON.parse(e.postData.contents);
    
    // デバッグ用：Raw_Dataシートに詳細なログを保存
    saveRawData(requestData, 'Received');
    
    // データ構造をログ出力
    console.log('Received data structure:', JSON.stringify(requestData, null, 2));
    
    // データを処理してスプレッドシートに保存
    processHealthData(requestData);
    
    // Raw_Dataシートのステータスを更新
    updateRawDataStatus('Success');
    
    return ContentService
      .createTextOutput(JSON.stringify({
        'status': 'success',
        'timestamp': new Date().toISOString(),
        'message': 'Health data processed successfully',
        'dataKeys': Object.keys(requestData)
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('Error processing health data:', error);
    
    // エラーログを保存
    saveRawData({error: error.toString(), stack: error.stack}, 'Error');
    
    return ContentService
      .createTextOutput(JSON.stringify({
        'status': 'error',
        'timestamp': new Date().toISOString(),
        'message': error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function saveRawData(data, status = 'Processing') {
  try {
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    let rawSheet = ss.getSheetByName('Raw_Data');
    
    if (!rawSheet) {
      rawSheet = ss.insertSheet('Raw_Data');
      rawSheet.getRange(1, 1, 1, 4).setValues([
        ['Timestamp', 'JSON_Data', 'Processing_Status', 'Error_Log']
      ]);
    }
    
    rawSheet.appendRow([
      new Date(),
      JSON.stringify(data, null, 2),
      status,
      ''
    ]);
  } catch (error) {
    console.error('Error saving raw data:', error);
  }
}

function updateRawDataStatus(status) {
  try {
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const rawSheet = ss.getSheetByName('Raw_Data');
    
    if (rawSheet) {
      const lastRow = rawSheet.getLastRow();
      if (lastRow > 1) {
        rawSheet.getRange(lastRow, 3).setValue(status);
      }
    }
  } catch (error) {
    console.error('Error updating raw data status:', error);
  }
}

function processHealthData(data) {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  
  console.log('Processing health data with keys:', Object.keys(data));
  
  // データ構造を確認・正規化
  let metrics = [];
  
  if (data.data && data.data.metrics) {
    metrics = data.data.metrics;
    console.log('Found metrics in data.data.metrics');
  } else if (data.metrics) {
    metrics = data.metrics;
    console.log('Found metrics in data.metrics');
  } else {
    console.log('No metrics found in expected locations');
    return;
  }
  
  // メトリクス配列をオブジェクトに変換（処理しやすくするため）
  const metricsMap = {};
  if (Array.isArray(metrics)) {
    metrics.forEach(metric => {
      if (metric.name && metric.data) {
        metricsMap[metric.name] = metric;
      }
    });
    console.log('Converted metrics array to map with keys:', Object.keys(metricsMap));
  }
  
  // 各データタイプを処理
  processSleepDataImproved(ss, metricsMap);
  processRespiratoryRateData(ss, metricsMap);
  processTimeSeriesMetrics(ss, metricsMap);
  processDailySummaryImproved(ss, metricsMap);
  
  // ワークアウトデータの処理（既存のまま）
  if (data.data && data.data.workouts) {
    processWorkoutData(ss, data.data.workouts);
  } else if (data.workouts) {
    processWorkoutData(ss, data.workouts);
  }
}

// 睡眠データの処理を改善
function processSleepDataImproved(ss, metricsMap) {
  try {
    console.log('Processing sleep data...');
    
    const sleepMetric = metricsMap['sleep_analysis'];
    if (!sleepMetric || !sleepMetric.data) {
      console.log('No sleep analysis data found');
      return;
    }
    
    let sleepSheet = ss.getSheetByName('Sleep_Detail');
    
    if (!sleepSheet) {
      sleepSheet = ss.insertSheet('Sleep_Detail');
      sleepSheet.getRange(1, 1, 1, 13).setValues([[
        'Date', 'Sleep_Start', 'Sleep_End', 'Total_Sleep_Hours', 'Deep_Sleep_Hours',
        'REM_Sleep_Hours', 'Core_Sleep_Hours', 'Awake_Hours', 'Asleep_Hours',
        'Source', 'Sleep_Quality_Score', 'Sleep_Efficiency', 'Created_At'
      ]]);
    }
    
    // 各睡眠記録を処理
    sleepMetric.data.forEach(sleepRecord => {
      try {
        // 日付の解析
        const sleepDate = new Date(sleepRecord.date);
        const sleepStart = new Date(sleepRecord.sleepStart);
        const sleepEnd = new Date(sleepRecord.sleepEnd);
        
        // 睡眠効率の計算（総睡眠時間 / ベッドにいた時間 * 100）
        const timeInBed = (sleepEnd - sleepStart) / (1000 * 60 * 60); // 時間単位
        const sleepEfficiency = timeInBed > 0 ? (sleepRecord.totalSleep / timeInBed * 100) : 0;
        
        // 睡眠品質スコアの計算（簡易版）
        const deepSleepRatio = sleepRecord.totalSleep > 0 ? (sleepRecord.deep / sleepRecord.totalSleep) : 0;
        const remSleepRatio = sleepRecord.totalSleep > 0 ? (sleepRecord.rem / sleepRecord.totalSleep) : 0;
        const sleepQualityScore = Math.round((deepSleepRatio * 40 + remSleepRatio * 30 + sleepEfficiency * 0.3));
        
        const sleepData = [
          Utilities.formatDate(sleepDate, Session.getScriptTimeZone(), 'yyyy-MM-dd'),
          sleepStart,
          sleepEnd,
          sleepRecord.totalSleep || 0,
          sleepRecord.deep || 0,
          sleepRecord.rem || 0,
          sleepRecord.core || 0,
          sleepRecord.awake || 0,
          sleepRecord.asleep || 0,
          sleepRecord.source || 'Unknown',
          sleepQualityScore,
          Math.round(sleepEfficiency * 10) / 10, // 小数点1桁に丸める
          new Date()
        ];
        
        sleepSheet.appendRow(sleepData);
        console.log(`Added sleep data for ${sleepRecord.date}`);
      } catch (recordError) {
        console.error('Error processing individual sleep record:', recordError);
      }
    });
    
    console.log(`Processed ${sleepMetric.data.length} sleep records`);
  } catch (error) {
    console.error('Error processing sleep data:', error);
  }
}

// 呼吸数データの処理
function processRespiratoryRateData(ss, metricsMap) {
  try {
    console.log('Processing respiratory rate data...');
    
    const respiratoryMetric = metricsMap['respiratory_rate'];
    if (!respiratoryMetric || !respiratoryMetric.data) {
      console.log('No respiratory rate data found');
      return;
    }
    
    let respiratorySheet = ss.getSheetByName('Respiratory_Rate');
    
    if (!respiratorySheet) {
      respiratorySheet = ss.insertSheet('Respiratory_Rate');
      respiratorySheet.getRange(1, 1, 1, 5).setValues([[
        'Date', 'Time', 'Respiratory_Rate_BPM', 'Units', 'Created_At'
      ]]);
    }
    
    // 各呼吸数記録を処理
    respiratoryMetric.data.forEach(record => {
      try {
        const recordDate = new Date(record.date);
        
        const respiratoryData = [
          Utilities.formatDate(recordDate, Session.getScriptTimeZone(), 'yyyy-MM-dd'),
          recordDate,
          record.qty || 0,
          respiratoryMetric.units || 'count/min',
          new Date()
        ];
        
        respiratorySheet.appendRow(respiratoryData);
      } catch (recordError) {
        console.error('Error processing individual respiratory rate record:', recordError);
      }
    });
    
    console.log(`Processed ${respiratoryMetric.data.length} respiratory rate records`);
  } catch (error) {
    console.error('Error processing respiratory rate data:', error);
  }
}

// その他の時系列メトリクスの処理
function processTimeSeriesMetrics(ss, metricsMap) {
  try {
    console.log('Processing time series metrics...');
    
    let timeSeriesSheet = ss.getSheetByName('Time_Series_Metrics');
    
    if (!timeSeriesSheet) {
      timeSeriesSheet = ss.insertSheet('Time_Series_Metrics');
      timeSeriesSheet.getRange(1, 1, 1, 6).setValues([[
        'Date', 'Time', 'Metric_Name', 'Value', 'Units', 'Created_At'
      ]]);
    }
    
    // 睡眠分析と呼吸数以外のメトリクスを処理
    Object.keys(metricsMap).forEach(metricName => {
      if (metricName === 'sleep_analysis' || metricName === 'respiratory_rate') {
        return; // すでに処理済み
      }
      
      const metric = metricsMap[metricName];
      if (!metric.data || !Array.isArray(metric.data)) {
        return;
      }
      
      metric.data.forEach(record => {
        try {
          const recordDate = new Date(record.date);
          
          const timeSeriesData = [
            Utilities.formatDate(recordDate, Session.getScriptTimeZone(), 'yyyy-MM-dd'),
            recordDate,
            metricName,
            record.qty || record.value || 0,
            metric.units || '',
            new Date()
          ];
          
          timeSeriesSheet.appendRow(timeSeriesData);
        } catch (recordError) {
          console.error(`Error processing ${metricName} record:`, recordError);
        }
      });
    });
    
    console.log('Completed processing time series metrics');
  } catch (error) {
    console.error('Error processing time series metrics:', error);
  }
}

// 日次サマリーの処理も改善
function processDailySummaryImproved(ss, metricsMap) {
  try {
    console.log('Processing daily summary...');
    
    let summarySheet = ss.getSheetByName('Daily_Summary');
    
    if (!summarySheet) {
      summarySheet = ss.insertSheet('Daily_Summary');
      summarySheet.getRange(1, 1, 1, 10).setValues([[
        'Date', 'Total_Sleep_Hours', 'Deep_Sleep_Hours', 'REM_Sleep_Hours', 'Avg_Respiratory_Rate',
        'Min_Respiratory_Rate', 'Max_Respiratory_Rate', 'Sleep_Quality_Score', 'Data_Points_Count', 'Last_Updated'
      ]]);
    }
    
    // 日付別にデータを集約
    const dailySummary = {};
    
    // 睡眠データの集約
    const sleepMetric = metricsMap['sleep_analysis'];
    if (sleepMetric && sleepMetric.data) {
      sleepMetric.data.forEach(record => {
        const dateKey = Utilities.formatDate(new Date(record.date), Session.getScriptTimeZone(), 'yyyy-MM-dd');
        if (!dailySummary[dateKey]) {
          dailySummary[dateKey] = {};
        }
        dailySummary[dateKey].totalSleep = record.totalSleep || 0;
        dailySummary[dateKey].deepSleep = record.deep || 0;
        dailySummary[dateKey].remSleep = record.rem || 0;
        
        // 睡眠品質スコアの計算
        const deepRatio = record.totalSleep > 0 ? (record.deep / record.totalSleep) : 0;
        const remRatio = record.totalSleep > 0 ? (record.rem / record.totalSleep) : 0;
        dailySummary[dateKey].sleepQuality = Math.round((deepRatio * 40 + remRatio * 30 + 30));
      });
    }
    
    // 呼吸数データの集約
    const respiratoryMetric = metricsMap['respiratory_rate'];
    if (respiratoryMetric && respiratoryMetric.data) {
      respiratoryMetric.data.forEach(record => {
        const dateKey = Utilities.formatDate(new Date(record.date), Session.getScriptTimeZone(), 'yyyy-MM-dd');
        if (!dailySummary[dateKey]) {
          dailySummary[dateKey] = {};
        }
        if (!dailySummary[dateKey].respiratoryRates) {
          dailySummary[dateKey].respiratoryRates = [];
        }
        dailySummary[dateKey].respiratoryRates.push(record.qty || 0);
      });
    }
    
    // 各日付のサマリーをスプレッドシートに追加
    Object.keys(dailySummary).forEach(dateKey => {
      const summary = dailySummary[dateKey];
      
      // 呼吸数の統計を計算
      let avgRespRate = 0, minRespRate = 0, maxRespRate = 0, dataPointsCount = 0;
      if (summary.respiratoryRates && summary.respiratoryRates.length > 0) {
        const rates = summary.respiratoryRates;
        avgRespRate = rates.reduce((sum, rate) => sum + rate, 0) / rates.length;
        minRespRate = Math.min(...rates);
        maxRespRate = Math.max(...rates);
        dataPointsCount = rates.length;
      }
      
      const summaryData = [
        dateKey,
        summary.totalSleep || 0,
        summary.deepSleep || 0,
        summary.remSleep || 0,
        Math.round(avgRespRate * 10) / 10,
        minRespRate,
        maxRespRate,
        summary.sleepQuality || 0,
        dataPointsCount,
        new Date()
      ];
      
      summarySheet.appendRow(summaryData);
      console.log(`Added daily summary for ${dateKey}`);
    });
    
    console.log(`Processed daily summaries for ${Object.keys(dailySummary).length} days`);
  } catch (error) {
    console.error('Error processing daily summary:', error);
  }
}

function processWorkoutData(ss, workouts) {
  try {
    let workoutSheet = ss.getSheetByName('Workout_Log');
    
    if (!workoutSheet) {
      workoutSheet = ss.insertSheet('Workout_Log');
      workoutSheet.getRange(1, 1, 1, 12).setValues([[
        'Date', 'Start_Time', 'End_Time', 'Workout_Type', 'Duration_min',
        'Distance_km', 'Calories_Burned', 'Avg_Heart_Rate', 'Max_Heart_Rate',
        'Avg_Speed_kmh', 'Max_Speed_kmh', 'Elevation_Gain_m'
      ]]);
    }
    
    if (Array.isArray(workouts)) {
      workouts.forEach(workout => {
        try {
          const startDate = new Date(workout.startDate || workout.start_date);
          const endDate = new Date(workout.endDate || workout.end_date);
          const duration = Math.round((endDate - startDate) / 60000); // 分単位
          
          const workoutData = [
            Utilities.formatDate(startDate, Session.getScriptTimeZone(), 'yyyy-MM-dd'),
            startDate,
            endDate,
            workout.workoutActivityType || workout.type || 'Unknown',
            duration,
            convertDistance(workout.totalDistance || workout.distance) || 0,
            workout.totalEnergyBurned || workout.calories || 0,
            workout.averageHeartRate || workout.avg_heart_rate || 0,
            workout.maximumHeartRate || workout.max_heart_rate || 0,
            convertSpeed(workout.averageSpeed || workout.avg_speed) || 0,
            convertSpeed(workout.maximumSpeed || workout.max_speed) || 0,
            workout.totalElevationAscended || workout.elevation || 0
          ];
          workoutSheet.appendRow(workoutData);
        } catch (workoutError) {
          console.error('Error processing individual workout:', workoutError);
        }
      });
      console.log(`Added ${workouts.length} workout records`);
    }
  } catch (error) {
    console.error('Error processing workout data:', error);
  }
}

function processNutritionData(ss, metrics) {
  try {
    const todayStr = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyy-MM-dd');
    let nutritionSheet = ss.getSheetByName('Nutrition_Log');
    
    if (!nutritionSheet) {
      nutritionSheet = ss.insertSheet('Nutrition_Log');
      nutritionSheet.getRange(1, 1, 1, 11).setValues([[
        'Date', 'Total_Calories', 'Carbs_g', 'Protein_g', 'Fat_g',
        'Sugar_g', 'Fiber_g', 'Sodium_mg', 'Caffeine_mg', 'Water_ml', 'Alcohol_units'
      ]]);
    }
    
    const nutritionData = [
      todayStr,
      getMetricValue(metrics, 'Dietary Energy') || 0,
      getMetricValue(metrics, 'Carbohydrates') || 0,
      getMetricValue(metrics, 'Protein') || 0,
      getMetricValue(metrics, 'Total Fat') || 0,
      getMetricValue(metrics, 'Dietary Sugar') || 0,
      getMetricValue(metrics, 'Fiber') || 0,
      convertWeight(getMetricValue(metrics, 'Sodium'), 'mg') || 0,
      convertWeight(getMetricValue(metrics, 'Dietary Caffeine'), 'mg') || 0,
      convertVolume(getMetricValue(metrics, 'Dietary Water')) || 0,
      getMetricValue(metrics, 'Alcohol Consumption') || 0
    ];
    
    nutritionSheet.appendRow(nutritionData);
    console.log('Added nutrition data');
  } catch (error) {
    console.error('Error processing nutrition data:', error);
  }
}

function processHealthMetrics(ss, metrics) {
  try {
    let metricsSheet = ss.getSheetByName('Health_Metrics');
    
    if (!metricsSheet) {
      metricsSheet = ss.insertSheet('Health_Metrics');
      metricsSheet.getRange(1, 1, 1, 6).setValues([[
        'Date', 'Time', 'Metric_Type', 'Value', 'Unit', 'Notes'
      ]]);
    }
    
    // 特殊な健康指標を記録
    const specialMetrics = [
      'Blood Pressure', 'Blood Glucose', 'Blood Oxygen Saturation',
      'Body Temperature', 'Respiratory Rate', 'Peripheral Perfusion Index'
    ];
    
    const now = new Date();
    const todayStr = Utilities.formatDate(now, Session.getScriptTimeZone(), 'yyyy-MM-dd');
    
    specialMetrics.forEach(metricName => {
      const value = getMetricValue(metrics, metricName);
      if (value !== null && value !== undefined) {
        metricsSheet.appendRow([
          todayStr,
          now,
          metricName,
          value,
          getMetricUnit(metricName),
          ''
        ]);
      }
    });
    
    console.log('Added health metrics data');
  } catch (error) {
    console.error('Error processing health metrics:', error);
  }
}

// ヘルパー関数
function getMetricValue(metrics, metricName) {
  if (!metrics || !metrics[metricName]) return null;
  
  const metricData = metrics[metricName];
  
  // 配列の場合、最新の値を取得
  if (Array.isArray(metricData) && metricData.length > 0) {
    const latestEntry = metricData[metricData.length - 1];
    return latestEntry.value || latestEntry.qty || latestEntry;
  }
  
  // オブジェクトの場合
  if (typeof metricData === 'object' && metricData !== null) {
    return metricData.value || metricData.qty || metricData.sum || metricData.avg;
  }
  
  // 数値の場合
  if (typeof metricData === 'number') {
    return metricData;
  }
  
  return null;
}

function getMetricUnit(metricName) {
  const units = {
    'Step Count': 'steps',
    'Walking + Running Distance': 'km',
    'Active Energy': 'kcal',
    'Heart Rate': 'bpm',
    'Weight & Body Mass': 'kg',
    'Blood Pressure': 'mmHg',
    'Blood Glucose': 'mg/dL',
    'Body Temperature': '°C',
    'Respiratory Rate': 'breaths/min',
    'Blood Oxygen Saturation': '%'
  };
  return units[metricName] || '';
}

function calculateSleepHours(metrics) {
  const sleepData = getMetricValue(metrics, 'Sleep Analysis');
  if (sleepData) {
    // 睡眠時間を時間単位で計算
    return sleepData.totalSleepTime || sleepData.asleep || 0;
  }
  return 0;
}

function calculateSleepQuality(metrics) {
  // 睡眠の質のスコアを計算（0-100）
  const sleepData = getMetricValue(metrics, 'Sleep Analysis');
  if (sleepData) {
    // 独自のスコア計算ロジック
    return sleepData.sleepQuality || sleepData.quality || 0;
  }
  return 0;
}

function getSleepAnalysis(metrics) {
  const sleepData = getMetricValue(metrics, 'Sleep Analysis');
  if (!sleepData) return null;
  
  const todayStr = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyy-MM-dd');
  
  return [
    todayStr,
    sleepData.bedTime || sleepData.start || '',
    sleepData.wakeTime || sleepData.end || '',
    sleepData.totalSleepTime || sleepData.asleep || 0,
    sleepData.deepSleep || sleepData.deep || 0,
    sleepData.remSleep || sleepData.rem || 0,
    sleepData.lightSleep || sleepData.light || 0,
    sleepData.awakeTime || sleepData.awake || 0,
    sleepData.sleepEfficiency || sleepData.efficiency || 0,
    getMetricValue(metrics, 'Apple Sleeping Wrist Temperature') || 0,
    getMetricValue(metrics, 'Breathing Disturbances') || 0,
    calculateSleepQuality(metrics)
  ];
}

// 単位変換関数
function convertDistance(value) {
  // メートルからキロメートルに変換
  if (typeof value === 'number') {
    return value / 1000;
  }
  return value;
}

function convertTime(value) {
  // 秒から分に変換
  if (typeof value === 'number') {
    return value / 60;
  }
  return value;
}

function convertVolume(value) {
  // リットルからミリリットルに変換（必要に応じて）
  if (typeof value === 'number' && value < 10) {
    return value * 1000; // リットルをmlに変換
  }
  return value;
}

function convertWeight(value, targetUnit) {
  // グラムからミリグラムに変換など
  if (typeof value === 'number' && targetUnit === 'mg' && value < 1) {
    return value * 1000; // gをmgに変換
  }
  return value;
}

function convertSpeed(value) {
  // m/sからkm/hに変換
  if (typeof value === 'number') {
    return value * 3.6;
  }
  return value;
}

// テスト用関数 - 提供されたJSONデータ構造に基づく
function testHealthDataProcessing() {
  console.log('Starting test with provided JSON structure...');
  
  // 提供されたJSONデータの一部を使用してテスト
  const testData = {
    "data": {
      "metrics": [
        {
          "units": "hr",
          "data": [
            {
              "source": "Aki's Apple Watch",
              "awake": 0.325,
              "asleep": 0,
              "deep": 0.9750000000000001,
              "date": "2025-05-28 00:00:00 +0800",
              "core": 4.508333333333332,
              "sleepStart": "2025-05-27 23:16:05 +0800",
              "rem": 1.8499999999999999,
              "sleepEnd": "2025-05-28 06:55:35 +0800",
              "totalSleep": 7.333333333333332
            },
            {
              "sleepStart": "2025-05-28 22:55:50 +0800",
              "asleep": 0,
              "date": "2025-05-29 00:00:00 +0800",
              "awake": 0.2,
              "deep": 0.7916666666666667,
              "totalSleep": 7.191666666666667,
              "core": 4.341666666666667,
              "rem": 2.0583333333333336,
              "source": "Aki's Apple Watch",
              "sleepEnd": "2025-05-29 06:19:20 +0800"
            }
          ],
          "name": "sleep_analysis"
        },
        {
          "name": "respiratory_rate",
          "units": "count/min",
          "data": [
            {
              "qty": 13.5,
              "date": "2025-05-28 00:09:00 +0800"
            },
            {
              "qty": 13,
              "date": "2025-05-28 00:21:00 +0800"
            },
            {
              "date": "2025-05-28 00:26:00 +0800",
              "qty": 12.5
            },
            {
              "date": "2025-05-28 00:39:00 +0800",
              "qty": 11
            },
            {
              "date": "2025-05-28 00:49:00 +0800",
              "qty": 13
            }
          ]
        }
      ]
    }
  };
  
  try {
    processHealthData(testData);
    console.log('Test data processed successfully');
    console.log('Check the following sheets for results:');
    console.log('- Sleep_Detail: 睡眠の詳細データ');
    console.log('- Respiratory_Rate: 呼吸数データ');
    console.log('- Daily_Summary: 日次統計サマリー');
    console.log('- Time_Series_Metrics: その他の時系列データ');
  } catch (error) {
    console.error('Test failed:', error);
  }
}

// doPost関数用のテスト
function testDoPost() {
  console.log('Testing doPost function...');
  
  const testData = {
    "data": {
      "metrics": [
        {
          "units": "hr",
          "data": [
            {
              "source": "Aki's Apple Watch",
              "awake": 0.325,
              "asleep": 0,
              "deep": 0.975,
              "date": "2025-05-28 00:00:00 +0800",
              "core": 4.508333333333332,
              "sleepStart": "2025-05-27 23:16:05 +0800",
              "rem": 1.85,
              "sleepEnd": "2025-05-28 06:55:35 +0800",
              "totalSleep": 7.333333333333332
            }
          ],
          "name": "sleep_analysis"
        },
        {
          "name": "respiratory_rate",
          "units": "count/min",
          "data": [
            {
              "qty": 13.5,
              "date": "2025-05-28 00:09:00 +0800"
            },
            {
              "qty": 13,
              "date": "2025-05-28 00:21:00 +0800"
            }
          ]
        }
      ]
    }
  };

  const e = {
    postData: {
      contents: JSON.stringify(testData),
      type: "application/json"
    }
  };

  try {
    const result = doPost(e);
    console.log('doPost test result:', result.getContent());
  } catch (error) {
    console.error('doPost test failed:', error);
  }
}

// データ構造分析用のヘルパー関数
function analyzeProvidedDataStructure() {
  console.log('=== 提供されたJSONデータ構造の分析 ===');
  console.log('');
  console.log('1. 最上位構造:');
  console.log('   { "data": { "metrics": [...] } }');
  console.log('');
  console.log('2. metrics配列の各要素:');
  console.log('   - name: メトリクス名 (例: "sleep_analysis", "respiratory_rate")');
  console.log('   - units: 単位 (例: "hr", "count/min")');
  console.log('   - data: 実際のデータ配列');
  console.log('');
  console.log('3. sleep_analysisのデータ構造:');
  console.log('   - date: 日付');
  console.log('   - sleepStart/sleepEnd: 睡眠開始・終了時刻');
  console.log('   - totalSleep: 総睡眠時間（時間）');
  console.log('   - deep/rem/core: 各睡眠段階の時間（時間）');
  console.log('   - awake/asleep: 起床・睡眠時間（時間）');
  console.log('   - source: データソース');
  console.log('');
  console.log('4. respiratory_rateのデータ構造:');
  console.log('   - date: 記録日時');
  console.log('   - qty: 呼吸数（回/分）');
  console.log('');
  console.log('5. GASでの処理方法:');
  console.log('   - metricsMap: 配列をオブジェクトに変換してアクセスしやすく');
  console.log('   - 各メトリクス専用の処理関数で詳細に処理');
  console.log('   - 複数日分のデータを一度に処理可能');
  console.log('   - 日次サマリーで統計情報を自動計算');
}

// デバッグ用：実際のデータ構造を確認する関数（改良版）
function debugDataStructure() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const rawSheet = ss.getSheetByName('Raw_Data');
  
  if (rawSheet && rawSheet.getLastRow() > 1) {
    const lastRow = rawSheet.getLastRow();
    const jsonData = rawSheet.getRange(lastRow, 2).getValue();
    
    console.log('=== 最新のJSONデータ構造 ===');
    console.log(jsonData);
    
    try {
      const parsed = JSON.parse(jsonData);
      console.log('');
      console.log('=== パースしたデータの分析 ===');
      console.log('最上位キー:', Object.keys(parsed));
      
      if (parsed.data) {
        console.log('data セクションのキー:', Object.keys(parsed.data));
        
        if (parsed.data.metrics && Array.isArray(parsed.data.metrics)) {
          console.log('metrics 配列の長さ:', parsed.data.metrics.length);
          console.log('各メトリクスの名前:');
          parsed.data.metrics.forEach((metric, index) => {
            console.log(`  [${index}] ${metric.name} (${metric.units || '単位なし'})`);
            if (metric.data && Array.isArray(metric.data)) {
              console.log(`      データ件数: ${metric.data.length}件`);
            }
          });
        }
      }
      
      if (parsed.metrics) {
        console.log('metrics セクションのキー:', Object.keys(parsed.metrics));
      }
    } catch (e) {
      console.log('JSONのパースエラー:', e);
    }
  } else {
    console.log('Raw_Dataシートにデータが見つかりません');
  }
} 